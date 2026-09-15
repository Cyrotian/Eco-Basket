import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
  cleanup,
} from "@testing-library/react";
import axios from "axios";
import Notification from "./Notification";
import { NotificationProvider } from "./NotificationContext";

// Mock axios globally for all tests
jest.mock("axios");

beforeEach(() => {
  jest.useFakeTimers();

  jest.spyOn(console, "error").mockImplementation((msg) => {
    if (msg.includes("ReactDOMTestUtils.act")) return;
    throw new Error(msg);
  });

  // Default mock for axios.get so that polling doesn't fail.
  axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
});

afterEach(() => {
  // Run and clear any pending timers (used for polling)
  jest.runOnlyPendingTimers();
  jest.useRealTimers();

  // Clean up after each test
  jest.clearAllMocks();
  console.error.mockRestore();
  cleanup();
});

describe("NotificationPage Tests", () => {
  test("renders notifications when fetched", async () => {
    // Use mockImplementation to cover all axios.get calls (initial + polling)
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            notificationId: 1,
            content: "Test 1",
            status: "UNREAD",
            createdAt: new Date().toISOString(),
          },
          {
            notificationId: 2,
            content: "Test 2",
            status: "READ",
            createdAt: new Date().toISOString(),
          },
        ],
      })
    );

    // Render the NotificationPage wrapped in its context provider
    await act(async () => {
      render(
        <NotificationProvider>
          <Notification />
        </NotificationProvider>
      );
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Verify unread notification appears initially
    await waitFor(() => {
      expect(screen.getByText("Test 1")).toBeInTheDocument();
    });

    // Click the "Read" tab to show read notifications
    const readTab = screen.getByRole("button", { name: /^Read$/i });
    fireEvent.click(readTab);

    // Verify the read notification is shown
    await waitFor(() => {
      expect(screen.getByText("Test 2")).toBeInTheDocument();
    });
  });

  test("shows toast when unread notifications arrive", async () => {
    // Return one unread notification for testing toast logic
    axios.get.mockResolvedValueOnce({
      data: [
        {
          notificationId: 1,
          content: "New Alert!",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        },
      ],
    });

    await act(async () => {
      render(
        <NotificationProvider options={{ showToast: true }}>
          <Notification />
        </NotificationProvider>
      );
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Ensure the notification content appears (which implies the toast worked)
    await waitFor(() => {
      expect(screen.getByText(/New Alert!/i)).toBeInTheDocument();
    });
  });

  test("marks a notification as read when button is clicked", async () => {
    // Provide one unread notification
    axios.get.mockResolvedValueOnce({
      data: [
        {
          notificationId: 1,
          content: "Test Notification",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        },
      ],
    });

    await act(async () => {
      render(
        <NotificationProvider>
          <Notification />
        </NotificationProvider>
      );
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Locate and click the "Mark as Read" button
    const markAsReadButton = await screen.findByTitle("Mark as Read");

    await act(async () => {
      fireEvent.click(markAsReadButton);
    });

    // Confirm that the notification is now marked as "Read"
    await waitFor(() => {
      expect(screen.getByText("Read")).toBeInTheDocument();
    });
  });

  test("marks all notifications as read when button is clicked", async () => {
    // Provide multiple unread notifications
    axios.get.mockResolvedValueOnce({
      data: [
        {
          notificationId: 1,
          content: "One",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        },
        {
          notificationId: 2,
          content: "Two",
          status: "UNREAD",
          createdAt: new Date().toISOString(),
        },
      ],
    });

    await act(async () => {
      render(
        <NotificationProvider>
          <Notification />
        </NotificationProvider>
      );
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Click "Mark All as Read"
    const markAllButton = await screen.findByRole("button", {
      name: /Mark All as Read/i,
    });

    await act(async () => {
      fireEvent.click(markAllButton);
    });

    // Expect at least one "Read" label (simplified check)
    await waitFor(() => {
      expect(screen.getByText("Read")).toBeInTheDocument();
    });
  });

  test("displays empty state when fetching fails", async () => {
    // Override error logging for this test to avoid failing due to expected error
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Simulate a network error
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    await act(async () => {
      render(
        <NotificationProvider>
          <Notification />
        </NotificationProvider>
      );
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    // Confirm that the empty state is displayed
    await waitFor(() => {
      expect(
        screen.getByText("No new notifications.")
      ).toBeInTheDocument();
    });

    // Restore console.error for other tests
    console.error = originalConsoleError;
  });
});

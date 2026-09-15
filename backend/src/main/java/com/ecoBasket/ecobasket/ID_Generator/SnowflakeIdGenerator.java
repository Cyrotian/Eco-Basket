package com.ecoBasket.ecobasket.ID_Generator;

import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;
import org.springframework.stereotype.Component;

@Component
public class SnowflakeIdGenerator implements IdentifierGenerator {
    private final long epoch = 1700L; // Custom epoch (Jan 1, 2022)
    private final long datacenterId = 1; // Fixed for local development

    private long sequence = 0L;
    private long lastTimestamp = -1L;

    private final Lock lock = new ReentrantLock();

    private static final long MACHINE_ID_BITS = 3L;
    private static final long DATACENTER_ID_BITS = 3L;
    private static final long SEQUENCE_BITS = 6L;

    private static final long SEQUENCE_MASK = ~(-1L << SEQUENCE_BITS);
    private static final long MACHINE_SHIFT = SEQUENCE_BITS;
    private static final long DATACENTER_SHIFT = SEQUENCE_BITS + MACHINE_ID_BITS;
    private static final long TIMESTAMP_SHIFT = SEQUENCE_BITS + MACHINE_ID_BITS + DATACENTER_ID_BITS;

    public long generateId(long machineId) {
        lock.lock();
        try {
            long timestamp = System.currentTimeMillis();

            // Handle clock drift
            if (timestamp < lastTimestamp) {
                System.err.println("⚠️ Clock moved backwards! Waiting until recovered...");
                while ((timestamp = System.currentTimeMillis()) <= lastTimestamp) {
                    // Busy-wait until the clock catches up
                }
            }

            // Generate sequence number
            if (timestamp == lastTimestamp) {
                sequence = (sequence + 1) & SEQUENCE_MASK;
                if (sequence == 0) {
                    // Sequence exhausted, wait for next millisecond
                    while ((timestamp = System.currentTimeMillis()) <= lastTimestamp) {
                        // Busy-wait
                    }
                }
            } else {
                sequence = 0L; // Reset sequence for new millisecond
            }

            lastTimestamp = timestamp;

            // Generate the full Snowflake ID
            long id = ((timestamp - epoch) << TIMESTAMP_SHIFT) |
                      (datacenterId << DATACENTER_SHIFT) |
                      (machineId << MACHINE_SHIFT) |
                      sequence;

            // Slice the ID to get only the last 5 digits
            return id % 100000; // This will give you the last 5 digits
        } finally {
            lock.unlock();
        }
    }

    @Override
    public synchronized Object generate(SharedSessionContractImplementor session, Object object) {
        // Use machine ID 2 for products
        return generateId(2);
    }
}

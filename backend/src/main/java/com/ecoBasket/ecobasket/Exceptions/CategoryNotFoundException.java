package com.ecoBasket.ecobasket.Exceptions;

public class CategoryNotFoundException extends RuntimeException {
  public CategoryNotFoundException(String message) {
      super(message);
  }
}

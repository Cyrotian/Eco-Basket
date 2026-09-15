package com.ecoBasket.ecobasket.Exceptions;

public class InvalidEmailException extends RuntimeException{

  public InvalidEmailException(String message){
    super(message);
  }
  
}

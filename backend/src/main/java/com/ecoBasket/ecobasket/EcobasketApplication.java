package com.ecoBasket.ecobasket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication(exclude = FlywayAutoConfiguration.class)
@EnableJpaAuditing
public class EcobasketApplication{

	public static void main(String[] args) {
		SpringApplication.run(EcobasketApplication.class, args);
	}

}

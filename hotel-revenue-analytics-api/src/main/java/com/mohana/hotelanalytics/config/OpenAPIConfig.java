package com.mohana.hotelanalytics.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hotel Revenue Analytics API")
                        .version("1.0.0")
                        .description("Production-quality REST API for managing hotel bookings and calculating real-time revenue and occupancy analytics.")
                        .contact(new Contact()
                                .name("Mohana Prasath R")
                                .email("mr0928@srmist.edu.in")
                                .url("https://mohanaprasath.in"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}

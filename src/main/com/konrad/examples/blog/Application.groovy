package com.konrad.examples.blog

import groovy.transform.CompileStatic
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
@CompileStatic
class Application {


    static void main(String[] args) {
        SpringApplication.run(Application.class, args)
    }
}

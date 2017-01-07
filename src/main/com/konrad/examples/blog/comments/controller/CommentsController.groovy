package com.konrad.examples.blog.comments.controller

import groovy.transform.CompileStatic
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController


@RestController
@CompileStatic
class CommentsController {

    @RequestMapping(value = "/v1/comments", method = RequestMethod.GET)
    String getCatalog() {
        return "to be continued"
    }
}

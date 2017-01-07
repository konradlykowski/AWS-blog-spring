package com.konrad.examples.blog.posts.domain

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable
import groovy.transform.builder.Builder
import jdk.nashorn.internal.objects.annotations.Setter
import org.jetbrains.kotlin.codegen.AccessorForPropertyDescriptor


@DynamoDBTable(tableName = "Posts")
public class Posts {

    public String id;


    @DynamoDBHashKey(attributeName = "id")
    public setId(String id) {
        this.id = id;
    }
    @DynamoDBHashKey(attributeName = "id")
    public getId() {
        return this.id
    }

}

package com.cork.server.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Type;

public class ContactMessage {

    @Size(min = 2, max = 255, message = "Subject must be 2-255 characters")
    private String subject;

    @Size(min = 12, message = "Message must be at least 12 characters.")
    @Size(max = 65000, message = "Message cannot be more than 65,000 characters.")
    @Type(type = "text")
    private String message;

    @NotNull(message = "E-mail is required")
    @Email(message = "Please enter a valid E-mail")
    private String email;

    private Long id;

    public ContactMessage() {
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}

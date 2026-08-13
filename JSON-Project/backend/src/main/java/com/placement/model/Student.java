package com.placement.model;

public class Student {
    private String id;
    private String name;
    private String email;
    private String degree;
    private double cgpa;
    private String skills;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public double getCgpa() { return cgpa; }
    public void setCgpa(double cgpa) { this.cgpa = cgpa; }
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
}

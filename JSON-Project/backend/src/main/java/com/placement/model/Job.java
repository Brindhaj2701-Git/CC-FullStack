package com.placement.model;

public class Job {
    private String id;
    private String companyId;
    private String title;
    private String description;
    private double requiredCgpa;

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCompanyId() { return companyId; }
    public void setCompanyId(String companyId) { this.companyId = companyId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getRequiredCgpa() { return requiredCgpa; }
    public void setRequiredCgpa(double requiredCgpa) { this.requiredCgpa = requiredCgpa; }
}

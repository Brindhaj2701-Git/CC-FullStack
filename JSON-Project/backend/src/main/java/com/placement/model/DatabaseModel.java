package com.placement.model;

import java.util.ArrayList;
import java.util.List;

public class DatabaseModel {
    private List<Student> students = new ArrayList<>();
    private List<Company> companies = new ArrayList<>();
    private List<Job> jobs = new ArrayList<>();
    private List<Application> applications = new ArrayList<>();

    public List<Student> getStudents() { return students; }
    public void setStudents(List<Student> students) { this.students = students; }
    public List<Company> getCompanies() { return companies; }
    public void setCompanies(List<Company> companies) { this.companies = companies; }
    public List<Job> getJobs() { return jobs; }
    public void setJobs(List<Job> jobs) { this.jobs = jobs; }
    public List<Application> getApplications() { return applications; }
    public void setApplications(List<Application> applications) { this.applications = applications; }
}

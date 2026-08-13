package com.placement.model;

public class Application {
    private String id;
    private String studentId;
    private String jobId;
    private String status; // e.g. "Applied", "Interview", "Selected", "Rejected"

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getJobId() { return jobId; }
    public void setJobId(String jobId) { this.jobId = jobId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

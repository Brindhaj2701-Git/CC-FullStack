package com.placement.controller;

import com.placement.model.Application;
import com.placement.model.Company;
import com.placement.model.Job;
import com.placement.model.Student;
import com.placement.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PortalController {

    @Autowired
    private DataRepository dataRepository;

    @GetMapping("/students")
    public List<Student> getStudents() {
        return dataRepository.getStudents();
    }

    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        return dataRepository.saveStudent(student);
    }

    @GetMapping("/companies")
    public List<Company> getCompanies() {
        return dataRepository.getCompanies();
    }

    @PostMapping("/companies")
    public Company createCompany(@RequestBody Company company) {
        return dataRepository.saveCompany(company);
    }

    @GetMapping("/jobs")
    public List<Job> getJobs() {
        return dataRepository.getJobs();
    }

    @PostMapping("/jobs")
    public Job createJob(@RequestBody Job job) {
        return dataRepository.saveJob(job);
    }

    @GetMapping("/applications")
    public List<Application> getApplications() {
        return dataRepository.getApplications();
    }

    @PostMapping("/applications")
    public Application createApplication(@RequestBody Application application) {
        return dataRepository.saveApplication(application);
    }
}

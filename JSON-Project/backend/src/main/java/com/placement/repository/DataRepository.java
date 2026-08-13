package com.placement.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.placement.model.*;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Repository
public class DataRepository {
    private static final String FILE_PATH = "data.json";
    private ObjectMapper mapper = new ObjectMapper();

    private DatabaseModel readDatabase() {
        File file = new File(FILE_PATH);
        if (!file.exists()) {
            return new DatabaseModel();
        }
        try {
            return mapper.readValue(file, DatabaseModel.class);
        } catch (IOException e) {
            e.printStackTrace();
            return new DatabaseModel();
        }
    }

    private void writeDatabase(DatabaseModel db) {
        try {
            mapper.writeValue(new File(FILE_PATH), db);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Student saveStudent(Student student) {
        DatabaseModel db = readDatabase();
        student.setId(UUID.randomUUID().toString());
        db.getStudents().add(student);
        writeDatabase(db);
        return student;
    }

    public java.util.List<Student> getStudents() {
        return readDatabase().getStudents();
    }

    public Company saveCompany(Company company) {
        DatabaseModel db = readDatabase();
        company.setId(UUID.randomUUID().toString());
        db.getCompanies().add(company);
        writeDatabase(db);
        return company;
    }

    public java.util.List<Company> getCompanies() {
        return readDatabase().getCompanies();
    }

    public Job saveJob(Job job) {
        DatabaseModel db = readDatabase();
        job.setId(UUID.randomUUID().toString());
        db.getJobs().add(job);
        writeDatabase(db);
        return job;
    }

    public java.util.List<Job> getJobs() {
        return readDatabase().getJobs();
    }

    public Application saveApplication(Application application) {
        DatabaseModel db = readDatabase();
        application.setId(UUID.randomUUID().toString());
        application.setStatus("Applied");
        db.getApplications().add(application);
        writeDatabase(db);
        return application;
    }

    public java.util.List<Application> getApplications() {
        return readDatabase().getApplications();
    }
}

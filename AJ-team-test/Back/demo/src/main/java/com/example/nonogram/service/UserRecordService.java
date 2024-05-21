package com.example.nonogram.service;

import com.example.nonogram.model.UserRecord;
import com.example.nonogram.repository.UserRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRecordService {

	@Autowired
	private UserRecordRepository userRecordRepository;

	public List<UserRecord> getAllUserRecords() {
		return userRecordRepository.findAll();
	}

	public UserRecord getUserRecordById(Long id) {
		return userRecordRepository.findById(id).orElse(null);
	}

	public UserRecord saveUserRecord(UserRecord userRecord) {
		return userRecordRepository.save(userRecord);
	}

	public void deleteUserRecord(Long id) {
		userRecordRepository.deleteById(id);
	}

	public List<UserRecord> getTopRecords(int puzzleId) {
		return userRecordRepository.findByPuzzleIdOrderByTimeTakenAsc(puzzleId);
	}
}

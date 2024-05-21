package com.example.nonogram.controller;

import com.example.nonogram.model.AnswerRequest;
import com.example.nonogram.model.UserRecord;
import com.example.nonogram.service.AnswerService;
import com.example.nonogram.service.UserRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
public class GameController {

	@Autowired
	private AnswerService answerService;

	@Autowired
	private UserRecordService userRecordService;

	@PostMapping("/submit")
	public ResponseEntity<Boolean> submitAnswer(@RequestBody AnswerRequest request) {
		boolean isCorrect = answerService.checkAnswer(request);
		if (isCorrect) {
			UserRecord userRecord = new UserRecord();
			userRecord.setPuzzleId(request.getPuzzleId().intValue());
			userRecord.setTimeTaken(request.getTimeTaken());
			userRecord.setUsername(request.getUsername());
			userRecordService.saveUserRecord(userRecord);
		}
		return ResponseEntity.ok(isCorrect);
	}


	@GetMapping("/leaderboard")
	public ResponseEntity<List<UserRecord>> getLeaderboard(@RequestParam int puzzleId) {
		List<UserRecord> topRecords = userRecordService.getTopRecords(puzzleId);
		return ResponseEntity.ok(topRecords);
	}
}

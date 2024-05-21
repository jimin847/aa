package com.example.nonogram.service;

import com.example.nonogram.model.AnswerRequest;
import com.example.nonogram.model.AnsBoard10;
import com.example.nonogram.model.AnsBoard15;
import com.example.nonogram.repository.AnsBoard10Repository;
import com.example.nonogram.repository.AnsBoard15Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AnswerService {
	@Autowired
	private AnsBoard10Repository ansBoard10Repository;
	@Autowired
	private AnsBoard15Repository ansBoard15Repository;

	public boolean checkAnswer(AnswerRequest request) {
		List<List<Integer>> userSolution = request.getSolution();
		boolean is10x10 = request.isIs10x10();
		Long puzzleId = request.getPuzzleId();

		if (puzzleId == null) {
			throw new IllegalArgumentException("The given id must not be null!");
		}

		if (is10x10) {
			Optional<AnsBoard10> optionalBoard = ansBoard10Repository.findById(puzzleId);
			if (optionalBoard.isPresent()) {
				AnsBoard10 ansBoard10 = optionalBoard.get();
				return checkSolution(ansBoard10, userSolution);
			}
		} else {
			Optional<AnsBoard15> optionalBoard = ansBoard15Repository.findById(puzzleId);
			if (optionalBoard.isPresent()) {
				AnsBoard15 ansBoard15 = optionalBoard.get();
				return checkSolution(ansBoard15, userSolution);
			}
		}
		return false;
	}

	private boolean checkSolution(AnsBoard10 board, List<List<Integer>> solution) {
		List<String> rows = List.of(board.getRow1(), board.getRow2(), board.getRow3(), board.getRow4(), board.getRow5(),
				board.getRow6(), board.getRow7(), board.getRow8(), board.getRow9(), board.getRow10());

		return checkRows(rows, solution);
	}

	private boolean checkSolution(AnsBoard15 board, List<List<Integer>> solution) {
		List<String> rows = List.of(board.getRow1(), board.getRow2(), board.getRow3(), board.getRow4(), board.getRow5(),
				board.getRow6(), board.getRow7(), board.getRow8(), board.getRow9(), board.getRow10(),
				board.getRow11(), board.getRow12(), board.getRow13(), board.getRow14(), board.getRow15());

		return checkRows(rows, solution);
	}

	private boolean checkRows(List<String> rows, List<List<Integer>> solution) {
		List<List<Integer>> correctSolution = rows.stream()
				.map(row -> List.of(row.split(",")).stream().map(Integer::parseInt).collect(Collectors.toList()))
				.collect(Collectors.toList());

		return correctSolution.equals(solution);
	}
}

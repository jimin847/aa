package com.example.nonogram.model;

import java.util.List;

public class AnswerRequest {
	private Long puzzleId;
	private boolean is10x10;
	private List<List<Integer>> solution;
	private String username;
	private long timeTaken;

	// Getters and Setters
	public Long getPuzzleId() {
		return puzzleId;
	}

	public void setPuzzleId(Long puzzleId) {
		this.puzzleId = puzzleId;
	}

	public boolean isIs10x10() {
		return is10x10;
	}

	public void setIs10x10(boolean is10x10) {
		this.is10x10 = is10x10;
	}

	public List<List<Integer>> getSolution() {
		return solution;
	}

	public void setSolution(List<List<Integer>> solution) {
		this.solution = solution;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public long getTimeTaken() {
		return timeTaken;
	}

	public void setTimeTaken(long timeTaken) {
		this.timeTaken = timeTaken;
	}
}

package com.example.nonogram.model;

import javax.persistence.*;

@Entity
@Table(name = "user_record")
public class UserRecord {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "puzzle_id")
	private int puzzleId;

	@Column(name = "time_taken")
	private long timeTaken;

	@Column(name = "username")
	private String username;

	@Column(name = "user_id")
	private Long userId;

	// Getters and Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getPuzzleId() {
		return puzzleId;
	}

	public void setPuzzleId(int puzzleId) {
		this.puzzleId = puzzleId;
	}

	public long getTimeTaken() {
		return timeTaken;
	}

	public void setTimeTaken(long timeTaken) {
		this.timeTaken = timeTaken;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}

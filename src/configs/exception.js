export class ForbiddenError extends Error {
	constructor(message) {
		super(message);
		this.name = "ForbiddenError";
	}
}

export class InternalServerError extends Error {
	constructor(message) {
		super(message);
		this.name = "InternalServerError";
	}
}

export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFoundError";
	}
}

export class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";
	}
}

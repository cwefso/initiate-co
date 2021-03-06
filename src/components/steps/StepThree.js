import React, { Component } from "react";

import { connect } from "react-redux";

class StepThree extends Component {
	constructor({ ProposalStep, handleIncrementClick, handleDecrementClick }) {
		super({ ProposalStep, handleIncrementClick, handleDecrementClick });
		this.state = {
			step: ProposalStep.initiativeStepReducer,
			error: "",
			ballot: {
				newDescription: "",
			},
		};
	}

	componentDidMount() {
		const savedNewDescription = localStorage.getItem("newDescription");

		if (savedNewDescription) {
			this.setState({
				ballot: {
					newDescription: savedNewDescription,
				},
			});
		}
	}

	submitNextStep = (event) => {
		event.preventDefault();
		this.props.handleIncrementClick();
		this.submitProgress(event);
	};

	submitProgress = (event) => {
		event.preventDefault();
		localStorage.setItem("newDescription", this.state.ballot.newDescription);
	};

	onChange = (event) => {
		let ballot = this.state.ballot;
		ballot[event.target.name] = event.target.value;
		this.setState({
			ballot,
		});
	};

	render() {
		return (
			<section className="step-three">
				<div className="step-title">
					<h1>
						Step {this.props.ballotProcess.id}: {this.props.ballotProcess.title}
					</h1>
				</div>
				<div className={"step-text"}>
					<p>
						Ok, so after Step 2 you’re most likely going to have a lot of
						comments and review to do. A revised proposal must be submitted to
						the legislative staff for review if the revisions are substantial.
						<div className="revision">
							<textarea
								type="textarea"
								placeholder="Enter the revised text of your proposal here"
								required="required"
								name="newDescription"
								value={this.state.ballot.newDescription}
								onChange={this.onChange}
								style={{
									marginTop: "1em",
									width: "50vw",
									height: "20vh",
									fontFamily: "Roboto, sans-serif",
								}}
							/>
							<button onClick={this.submitProgress}>Save</button>
						</div>
						Again, a public meeting is scheduled for two weeks following receipt
						of the proposal. The procedures followed are identical to those set
						forth in Steps 1 and 2, except that if legislative staff has no
						additional comments on the revised proposal, the proponents are so
						notified and the review and comment meeting is canceled. This
						notification occurs within 72 hours of the proposal's submission.
					</p>
				</div>
				<h3>
					Last Day for Review and Comment Meeting on Revised Proposal:{" "}
					{this.props.ballotProcess.dueDate}
				</h3>
				<div className="buttons">
					<button
						data-testid="research-button"
						onClick={this.props.handleDecrementClick}
					>
						Go Back
					</button>
					<button
						data-testid="research-button"
						onClick={this.props.handleIncrementClick}
					>
						Next Step
					</button>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ProposalStep: state,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleIncrementClick: () => dispatch({ type: "INCREMENT" }),
		handleDecrementClick: () => dispatch({ type: "DECREMENT" }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);

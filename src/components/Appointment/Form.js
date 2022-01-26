
import React, { useState, Fragment } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// export default function Form(props) {
//   const [interviewer, setInterviewer] = useState(props.interviewer || null);
//   const [name, setName] = useState(props.name || "");
//   const [error, setError] = useState("");

//   const reset = () => {
//     setName("");
//     setInterviewer(null);
//   };

//   const cancel = () => {
//     reset();
//     props.onCancel();
//   };

//   const validate = () => {
//     if (name === "") {
//       setError("Student name cannot be blank");
//       return;
//     }

//     setError("");
//     props.onSave(name, interviewer);
//   };

//   return (
//     <main className="appointment__card appointment__card--create">
//       <section className="appointment__card-left">
//         <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
//           <input
//             className="appointment__create-input text--semi-bold"
//             name="name"
//             type="text"
//             placeholder="Enter Student Name"
//             value={name}
//             onChange={(event) => {
//               setName(event.target.value);
//             }}
//             data-testid="student-name-input"
//           />
//         </form>

//         <section className="appointment__validation">{error}</section>

//         <InterviewerList
//           interviewers={props.interviewers}
//           value={interviewer}
//           onChange={setInterviewer}
//         />
//       </section>
//       <section className="appointment__card-right">
//         <section className="appointment__actions">
//           <Button danger onClick={cancel}>
//             Cancel
//           </Button>
//           <Button confirm onClick={validate}>
//             Save
//           </Button>
//         </section>
//       </section>
//     </main>
//   );
// }

 
export default function(
  { name, interviewer, onCancel, onSave, interviewers } = this.props
) {
  const [formName, setFormName] = useState(name || "");
  const [formInterviewer, setFormInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  
  const reset = function() {
    setFormName("");
    setFormInterviewer(null);
  };

  const cancel = function() {
    reset();
    onCancel();
  };

  
  function validate() {
    if (formName === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    onSave(formName, formInterviewer);
  }

  return (
    <Fragment>
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off">
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              onChange={event => setFormName(event.target.value)}
              value={formName}
              data-testid="student-name-input"
            />
          </form>
          <section className="appointment__validation">{error}</section>
          {formInterviewer ? <InterviewerList
            interviewers={interviewers}
            value={formInterviewer.id}
            onChange={setFormInterviewer}
          />
          :
          <InterviewerList
            interviewers={interviewers}
            value={formInterviewer}
            onChange={setFormInterviewer}
          />
          }
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={event => cancel()}>
              Cancel
            </Button>
            <Button
              confirm
              onClick={event => validate()}
            >
              Save
            </Button>
          </section>
        </section>
      </main>
    </Fragment>
  );
}

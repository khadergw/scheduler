import React, { useEffect } from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';



/**
 * Returns the entire appointment view
 * @param {} param0 
 */
 export default function(
  {
    id,
    time,
    interview,
    student,
    interviewers,
    bookInterview,
    cancelInterview
  } = this.props
) {

  //Lists all modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview == null ? EMPTY : SHOW
  );

  /**
   * Saves a new interview object
   * @param {*} name
   * @param {*} interviewer
   */
  const save = (name, interviewer) => {
    if (!interviewer) {
      transition(ERROR_SAVE, true);
    } else {
      const interview = {
        student: name,
        interviewer: interviewer.id
       };
      transition(SAVING);
      bookInterview(id, interview).then(
        () => { 
          transition(SHOW)
        },
        error => {
          console.log("Saving error:", error);
          transition(ERROR_SAVE, true);
        }
      );
    }
  };

  /**
   * Removed interview from slot
   */
  const remove = () => {
    if (mode === SHOW) {
      transition(CONFIRM);
    } else {
      transition(DELETING);
      cancelInterview(id).then(
        () => transition(EMPTY),
        error => {
          console.log("Delete error:", error);
          transition(ERROR_DELETE, true);
        }
      );
    }
  };

  const edit = () => {
    transition(EDIT);
  };

  const errorClose = () => {
    back();
  };

  useEffect(() => {

    debugger
    if (interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [interview, transition, mode]);

  return (
    <article data-testid="appointment">
      <Header time={time}></Header>

      {/* Renders correct view based on mode */}
      {mode === EMPTY && <Empty onAdd={transition} />}
      {mode === SHOW && interview && (
        <Show
          student={student}
          interviewer={interview}
          onDelete={remove}
          onEdit={edit}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel this appointment"
          onCancel={back}
          onConfirm={remove}
        />
      )}

      {mode === EDIT && (
        <Form
          name={student}
          interviewer={interview}
          onCancel={back}
          onSave={save}
          interviewers={interviewers}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message="You must selected an interviewer" onClose={errorClose} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={errorClose} />
      )}
    </article>
  );
}


import React from 'react';
import 'components/Appointment/styles.scss';

export default function(props) {

 const CREATE = "CREATE";

 return (
   <main className="appointment__add">
     <img
       className="appointment__add-button"
       src="images/add.png"
       alt="Add"
       onClick={()=>props.onAdd(CREATE)}
     />
   </main>
 )
}
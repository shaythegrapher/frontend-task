import React from "react";
import styles from "./SingleApplication.module.css";

type Application = {
  id: number;
  company: string;
  first_name: string;
  last_name: string;
  email: string;
  loan_amount: number;
  date_created: string;
  expiry_date: string;
};

interface Props {
  application: Application;
}

const SingleApplication: React.FC<Props> = ({ application }) => {
  // format as dd-mm-yyyy
  const formatDate = (dateString: string) =>
    new Date(dateString)
      .toLocaleDateString("en-GB") // gives "10/12/2021"
      .replace(/\//g, "-");        // changes / to -

  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        <span className={styles.value}>{application.company}</span>
      </div>

      <div className={styles.cell}>
        <sub>Name</sub>
        <span className={styles.value}>
          {application.first_name} {application.last_name}
        </span>
      </div>

      <div className={styles.cell}>
        <sub>Email</sub>
        <span className={styles.email}>{application.email}</span>
      </div>

      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        <span className={styles.value}>
          £{application.loan_amount.toLocaleString()}
        </span>
      </div>

      <div className={styles.cell}>
        <sub>Application Date</sub>
        <span className={styles.value}>{formatDate(application.date_created)}</span>
      </div>

      <div className={styles.cell}>
        <sub>Expiry Date</sub>
        <span className={styles.value}>{formatDate(application.expiry_date)}</span>
      </div>
    </div>
  );
};

export default SingleApplication;

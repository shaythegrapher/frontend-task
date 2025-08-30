import React, { useState, useEffect } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";

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

const Applications: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/applications?_page=1&_limit=5`)
      .then(res => {
        const link = res.headers.get("Link");
        if (!link || !link.includes('rel="next"')) {
          setHasMore(false);
        }
        return res.json();
      })
      .then((data: Application[]) => setApps(data));
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    fetch(`http://localhost:3001/api/applications?_page=${nextPage}&_limit=5`)
      .then(res => {
        const link = res.headers.get("Link");
        if (!link || !link.includes('rel="next"')) {
          setHasMore(false);
        }
        return res.json();
      })
      .then((data: Application[]) =>
        setApps(prev => [...prev, ...data])
      );
    setPage(nextPage);
  };

  return (
    <div className={styles.Applications}>
      {apps.map(app => (
        <SingleApplication key={app.id} application={app} />
      ))}
      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Applications;
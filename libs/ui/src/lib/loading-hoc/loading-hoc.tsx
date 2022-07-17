import React, { useState } from 'react';

import styles from './loading-hoc.module.scss';

/* eslint-disable-next-line */
export interface LoadingHocProps {
  setLoading: (loading: boolean) => void;
}

export function LoadingHoc<T extends LoadingHocProps>(WrappedComponent: React.FunctionComponent<T>) {
  function HOC(props) {
    const [isLoading, setLoading] = useState(true);

    const setLoadingState = isComponentLoading => {
      setLoading(isComponentLoading);
    }

    return (
      <React.Fragment>
        {isLoading && <div className={styles.loader}>
          <div className="loader-content">
            Please wait as we gathering the data for you!
          </div>

        </div>}
        <WrappedComponent {...props} setLoading={setLoadingState}></WrappedComponent>
      </React.Fragment>
    )
  }

  return HOC;
}

export default LoadingHoc;

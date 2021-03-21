import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    // use useContext for get signed user Details
    const [signedInUser, setSignedInUser] = useContext(UserContext)
    return (
        <div>
            <Route
                {...rest}
                render={({ location }) =>
                    signedInUser.email ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        </div>
    );
};

export default PrivateRoute;
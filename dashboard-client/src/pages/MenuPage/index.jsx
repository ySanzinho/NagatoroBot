import React from "react";
import { getUserDetails } from '../../utils/api';

export function MenuPage( {
    history,
} ) {
    const [ user, setUser ] = React.useState( null );
    const [ loading, setLoading ] = React.useState( true );

    React.useEffect( () => {
        getUserDetails()
        .then( ({data}) => {
            console.log(data);
            setUser(data);
            setLoading(false);
        }).catch( (err) => {
            history.push( '/' );
            setLoading(false);
        })
    }, [])

    return !loading && (
        <div>
            <h1>Menu Page</h1>
        </div>
    )
}
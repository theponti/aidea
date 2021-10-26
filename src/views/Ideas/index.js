import { withAuthenticationRequired } from '@auth0/auth0-react';
import React, { Suspense } from 'react';

const IdeasScene = React.lazy(() => import('./Ideas'))

function LazyIdeas() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <IdeasScene/>
        </Suspense>
    )
}

export default withAuthenticationRequired(LazyIdeas)
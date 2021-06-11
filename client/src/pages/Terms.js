import React from 'react';
import TermsConditions from '../components/TermsConditions';


const Terms = () => {

    return (
        <div style={{ width: 'fit-content', height: 'fit-content', margin: 'auto', overflow: 'auto', padding: '5em' }}>
            <div style={{ display: 'inline-block', paddingTop: '1em' }}>
                <div>
                    <TermsConditions />
                </div>
            </div>
        </div>
    )
}

export default Terms;
import React from 'react';

import { InputFile } from '../../common/inputFile/InputFile';
import { TableAdmin } from '../../common/TableAdmin';


export const HomeScreen = () => {
    
    console.log("HomeScreen");
    return (
        <div>
            <div className="cont-inputFile-HS">
                <InputFile/>
            </div>
            <TableAdmin />
        </div>
    )
}

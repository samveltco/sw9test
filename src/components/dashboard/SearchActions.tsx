import React from 'react';
import {jwtDecode} from 'jwt-decode';

interface SearchActionsProps {
    onImportClick: () => void;
    onCreateWorkOrder: () => void;
    onExport: () => void;
}

interface TokenPayload {
    userType: string;
}

const SearchActions: React.FC<SearchActionsProps> = ({
                                                         onImportClick,
                                                         onCreateWorkOrder,
                                                         onExport
                                                     }) => {
    const token = localStorage.getItem('jwtToken');
    let userType: string | null = null;

    if (token) {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            userType = decoded.userType;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    return (
        <div className="search_actions">
            <form className="search_form">
                <div className="field_block">
                    <input
                        type="text"
                        name="search"
                        maxLength={50}
                        aria-label="search"
                        placeholder="Search"
                    />
                </div>
                <div className="field_block">
                    <input
                        type="text"
                        name="zip_code"
                        maxLength={8}
                        aria-label="zip code"
                        placeholder="Zip code"
                    />
                </div>
                <button className="search_btn icon_search" aria-label="search" type="submit"></button>
            </form>

            <div className="btns_block">
                {userType !== 'contractor' && userType !== 'superAdmin' && (
                    <>
                        <button
                            className="standard_btn icon_plus curry_btn"
                            onClick={onCreateWorkOrder}
                            aria-label="Create work order"
                            type="button"
                        >
                            Create work order
                        </button>
                        <button
                            className="standard_btn icon_import orange_btn"
                            onClick={onImportClick}
                            aria-label="Import work order(s)"
                            type="button"
                        >
                            Import work order(s)
                        </button>
                    </>
                )}

                <button
                    className="standard_btn icon_export green_btn"
                    onClick={onExport}
                    aria-label="Export EXCEL"
                    type="button"
                >
                    Export EXCEL
                </button>
            </div>
        </div>
    );
};

export default SearchActions;

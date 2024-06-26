/** @format */

import { useContext, useCallback } from 'react';
import styles from './styles/Menu.module.css';
import Button from '../../common/Button';
import useMatchMedia from '../../common/functions/useMatchMedia';
import NotesContext from '../../common/NotesContext';

function Menu(props) {
    const {
        notes: { game },
        showNotes,
        showTracker,
        mode,
        foundModifiers,
        folderEditView,
        setContext,
    } = useContext(NotesContext);

    const changeMode = useCallback(() => {
        setContext({ mode: mode === 'list' ? 'presenter' : 'list' });
    }, [mode, setContext]);

    const resetTracker = useCallback(() => {
        let newFoundItems = JSON.parse(
            JSON.stringify(
                require('../../../resources/' +
                    game +
                    '/DefaultFoundItems.json'),
            ),
        );
        let newFoundModifiers = foundModifiers;
        if (newFoundModifiers != null) {
            newFoundModifiers = JSON.parse(
                JSON.stringify(
                    require('../../../resources/' +
                        game +
                        '/DefaultFoundModifiers.json'),
                ),
            );
        }

        setContext({
            foundItems: newFoundItems,
            foundModifiers: newFoundModifiers,
        });

        localStorage.setItem(
            'foundItems-' + game,
            JSON.stringify(newFoundItems),
        );
        localStorage.setItem(
            'foundModifiers-' + game,
            JSON.stringify(newFoundModifiers),
        );
    }, [game, foundModifiers, setContext]);

    const updateNotesDisplay = useCallback(() => {
        setContext({ showNotes: !showNotes });
    }, [showNotes, setContext]);

    const updateTrackerDisplay = useCallback(() => {
        setContext({ showTracker: !showTracker });
    }, [showTracker, setContext]);

    const swapNotesAndTracker = useCallback(() => {
        setContext({ showNotes: !showNotes, showTracker: !showTracker });
    }, [showNotes, showTracker, setContext]);

    let modeText = mode === 'presenter' ? 'List Mode' : 'Presenter Mode';

    let previewButton = '';
    if (props.preview) {
        previewButton = (
            <Button
                text="Edit Route"
                size="medium"
                className={`${styles.btn}`}
                onClick={props.swapPreview}
            />
        );
    }

    // If on mobile, use a different button layout where users can only swap notes and tracker.
    if (useMatchMedia('(max-width: 600px)')) {
        let notesText = showNotes ? 'Show Tracker' : 'Show Notes';
        return (
            <div className={`card ${styles.menu}`}>
                <Button
                    text="Reset Tracker"
                    className={`${styles.btn}`}
                    onClick={resetTracker}
                />
                <Button
                    text={notesText}
                    className={`${styles.btn}`}
                    onClick={swapNotesAndTracker}
                />
                <Button
                    text={modeText}
                    className={`${styles.btn}`}
                    onClick={changeMode}
                />
                {previewButton}
                <div className={styles.buffer} />
                <div className={`${styles.row}`}>
                    <div className={`${styles.label}`}>Folder Edit View</div>
                    <select
                        name="folderEditDisplay"
                        value={folderEditView}
                        className={`${styles.select}`}
                        onChange={(e) =>
                            setContext({ folderEditView: e.target.value })
                        }>
                        <option value="Actions">Actions</option>
                        <option value="Differences">Differences</option>
                        <option value="Inputs">Inputs</option>
                    </select>
                </div>
                <div className={styles.buffer} />
            </div>
        );
    } else {
        let showNotesText = showNotes ? 'Hide Notes' : 'Show Notes';
        let showTrackerText = showTracker ? 'Hide Tracker' : 'Show Tracker';

        return (
            <div className={`card ${styles.menu}`}>
                <div className={`${styles.col}`}>
                    <Button
                        testId="notes-display-button"
                        text={showNotesText}
                        size="medium"
                        className={`${styles.btn}`}
                        onClick={updateNotesDisplay}
                    />
                    <Button
                        testId="tracker-display-button"
                        text={showTrackerText}
                        size="medium"
                        className={`${styles.btn}`}
                        onClick={updateTrackerDisplay}
                    />
                    <Button
                        testId="reset-tracker-button"
                        text="Reset Tracker"
                        size="medium"
                        className={`${styles.btn}`}
                        onClick={resetTracker}
                    />
                    <Button
                        testId="mode-button"
                        text={modeText}
                        size="medium"
                        className={`${styles.btn}`}
                        onClick={changeMode}
                    />
                </div>
                <div className={`${styles.dropdown}`}>
                    <div className={`${styles.label}`}>Folder Edit View</div>
                    <div>
                        <select
                            name="folderEditDisplay"
                            data-id={
                                process.env.NODE_ENV === 'development'
                                    ? 'folder-edit-display-dropdown'
                                    : null
                            }
                            value={folderEditView}
                            className={`${styles.select}`}
                            onChange={(e) =>
                                setContext({ folderEditView: e.target.value })
                            }>
                            <option value="Actions">Actions</option>
                            <option value="Differences">Differences</option>
                            <option value="Inputs">Inputs</option>
                        </select>
                    </div>
                </div>
                <div className={`${styles.col}`}>{previewButton}</div>
            </div>
        );
    }
}

export default Menu;

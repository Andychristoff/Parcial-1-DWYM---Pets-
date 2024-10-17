function ToggleThemeButton( { theme, dispatch } ) {
    const handleClick = () => {
        dispatch({ type: 'SET_THEME', payload: theme === 'light' ? 'dark' : 'light' });
    };
    return (
        <button onClick={handleClick}>
            {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    );
}
export default ToggleThemeButton;
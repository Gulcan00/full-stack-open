const Notification = ({message, type}) => {
    const color = type === 'success' ? 'green' : 'red';
    const styles = {
        border: '2px solid',
        borderColor: color,
        padding: '8px 12px',
        marginBottom: '12px',
        color,
        backgroundColor: '#f5ededff',
        borderRadius: '6px'
    }

    if (!message) return null;

    return <div style={styles}>{message}</div>
}

export default Notification;
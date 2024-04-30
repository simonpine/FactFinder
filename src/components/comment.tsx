function Comment({ name, picture, comment }: {
    name: string;
    picture: string
    comment: string
}) {
    return (
        <div className='CartComent'>
            <div>
                <img alt='User icon' src={picture}></img>
                <h4>{name}</h4>
            </div>
            <p className='commentP'>{comment}</p>
        </div>
    )
}
export default Comment
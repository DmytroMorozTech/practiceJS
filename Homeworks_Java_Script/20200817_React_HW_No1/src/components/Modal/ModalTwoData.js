export default
    {
        header: 'Do you want to upload a new file?',
        closeButton: false,
        text: `There is nothing easier than uploading a piece of data to our platform :)`,
        actions: [
            {
                id: 1,
                backgroundColor: '#f0b084',
                text: 'UPLOAD',
                onClickHandler: function() {
                    alert('Your file was uploaded to our platform!')
                    this.setState({
                        modalWindowIsOpen: {
                            ...this.state.modalWindowIsOpen,
                            modalTwo: false
                        }
                    })
                }
            },
            {
                id: 2,
                backgroundColor: '#8a2338',
                text: 'QUIT',
                onClickHandler: function() {
                    this.setState({
                        modalWindowIsOpen: {
                            ...this.state.modalWindowIsOpen,
                            modalTwo: false
                        }
                    })
                }
            }
        ]
    }
export default
    {
        header: 'Do you want to remove archived data?',
        closeButton: true,
        text: `This action is irreversable. Please, think twice!`,
        actions: [
            {
                id: 1,
                backgroundColor: '#a1a332',
                text: 'Remove',
                onClickHandler: function () {
                    alert('Archived data was successfully removed.')
                    this.setState({
                        modalWindowIsOpen: {
                            ...this.state.modalWindowIsOpen,
                            modalOne: false
                        }
                    })
                }
            },
            {
                id: 2,
                backgroundColor: '#d7da5a',
                text: 'Cancel',
                onClickHandler: function () {
                    this.setState({
                        modalWindowIsOpen: {
                            ...this.state.modalWindowIsOpen,
                            modalOne: false
                        }
                    })
                }
            }
        ]
    }
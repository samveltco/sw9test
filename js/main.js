if (
    document.querySelectorAll('.sidebar, .profile_inner, .filter_inner, .modal_block, .popup_block, .new_note, .form_account, .modal_import, .cards_list, .filter_content').length > 0
) {

    toggleSidebar = function () {
        document.querySelector('.sidebar')?.classList.toggle('opened');
    }

    showProfileModal = function () {
        document.querySelector('.profile_inner')?.classList.add('opened');
    }

    hideProfileModal = function () {
        document.querySelector('.profile_inner')?.classList.remove('opened');
    }

    showFilter = function () {
        document.querySelector('.filter_inner')?.classList.add('opened');
    }

    hideFilter = function () {
        document.querySelector('.filter_inner')?.classList.remove('opened');
    }

    showModal = function () {
        document.querySelector('.popup_block')?.classList.add('showed');
    }

    hideModal = function () {
        document.querySelector('.popup_block')?.classList.remove('showed');
    }

    NewNoteShow = function () {
        document.querySelector('.new_note')?.classList.add('showed');
    }

    NewNoteHidden = function () {
        document.querySelector('.new_note')?.classList.remove('showed');
    }

    EditNoteShow = function () {
        document.querySelector('.form_account')?.classList.add('opened');
    }

    EditNoteHidden = function () {
        document.querySelector('.form_account')?.classList.remove('opened');
    }

    hideForm = function () {
        document.querySelector('.form_account')?.classList.remove('opened');
    }

    importShow = function () {
        document.querySelector('.modal_import')?.classList.add('showed');
    }

    importHidden = function () {
        document.querySelector('.modal_import')?.classList.remove('showed');
    }

    document.onscroll = () => {
        const list = document.querySelector('.cards_list');
        const header = document.querySelector('.header');
        if (!list || !header) return;

        const scrollSize = window.scrollY;
        const headerHeight = header.offsetHeight;
        const listTop = list.offsetTop;
        const listHeight = list.offsetHeight;

        if (scrollSize > listTop - headerHeight) {
            list.querySelector('.top_shadow')?.classList.add('showed');
        } else {
            list.querySelector('.top_shadow')?.classList.remove('showed');
        }

        if (scrollSize + window.innerHeight < listTop + listHeight) {
            list.querySelector('.bottom_shadow')?.classList.add('showed');
        } else {
            list.querySelector('.bottom_shadow')?.classList.remove('showed');
        }
    }

    document.dispatchEvent(new Event('scroll'));

    const filterContent = document.querySelector('.filter_content');
    if (filterContent) {
        filterContent.addEventListener('scroll', () => {
            const scrollSize = filterContent.scrollTop;
            const listHeight = filterContent.offsetHeight;
            const listFullHeight = filterContent.scrollHeight;

            const topShadow = document.querySelector('.filter_inner .top_shadow');
            const bottomShadow = document.querySelector('.filter_inner .bottom_shadow');

            if (scrollSize > 0) {
                topShadow?.classList.add('showed');
            } else {
                topShadow?.classList.remove('showed');
            }

            if (scrollSize < listFullHeight - listHeight) {
                bottomShadow?.classList.add('showed');
            } else {
                bottomShadow?.classList.remove('showed');
            }
        });

        filterContent.dispatchEvent(new Event('scroll'));
    }
}

<div class="header">
    <div class="welcome_block">
        <div class="welcome_words">
            Hey <span class="user_name">Mani,</span> welcome back! 
        </div>
        <div class="welcome_info">Welcome to The 209 Group</div>
        <div class="available_funds">Funds Available: $1,268.22</div>
    </div>
    <div class="notifications">
        <button class="notif_btn icon_notif" aria-label="notifications">
            <span class="count_block">6</span>
        </button>
    </div>
    <div class="profile_block">
        <button class="profile_btn" aria-label="profile" onclick="showProfileModal()">
            <img src="images/avatar.jpg" alt="" title="" width="44" height="44"/>
            <span class="user_info">
                <span class="user_name">Moni Roy</span>
                <span class="user_type">Client</span>
            </span>
        </button>
        <div class="profile_inner">
            <div class="profile_head">
                <div class="profile_title">Might Deployment Solutions</div>
                <button class="close_btn icon_close" aria-label="close" onclick="hideProfileModal()"></button> 
            </div>
            <div class="profile_content">
                <div class="profile_main">
                    <div class="info_block">
                        <div class="user_position">Might Deployment Solutions</div>
                        <div class="user_name">Stephanie Bledsoe</div>
                        <div class="sign_info">Date Registered: 10/7/2020</div>
                        <div class="sign_info">Last Login: 7/9/2025, 2:08:32 PM</div>
                    </div>
                    <div class="image_block">
                        <img src="images/avatar.jpg" alt="" title="" width="84" height="84"/>
                    </div>
                </div>
                <ul class="profile_contacts">
                    <li>
                        <div class="profile_label">Address</div>
                        <div class="profile_info">3075 6th St SW, Loveland, Colorado 80537</div>
                    </li>
                    <li>
                        <div class="profile_label">Website</div>
                        <div class="profile_info">
                            <a href="www.sourcew9.com" target="_blank">www.sourcew9.com</a>
                        </div>
                    </li>
                    <li>
                        <div class="profile_label">Phone</div>
                        <div class="profile_info">
                            <a href="tel:4022022996">(402) 202-2996</a>
                        </div>
                    </li>
                    <li>
                        <div class="profile_label">Email</div>
                        <div class="profile_info">
                            <a href="mailto:stephanieb@mightdeployment.com">stephanieb@mightdeployment.com</a>
                        </div>
                    </li>
                </ul>
                <div class="about_user">
                     <div class="profile_label">Bio / About:</div>
                    <div class="profile_info">We are a service project management company that handles networking, POS, and cabling work.</div>
                </div>
                <div class="profile_actions">
                    <button class="standard_btn light_btn icon_plus" aria-label="add new role">Add new note</button>
                    <button class="standard_btn dark_btn icon_edit" aria-label="edit">Edit</button>
                </div>
            </div>
        </div>
    </div>

    <div class="sidebar">
        <div class="menu_btn_block">
            <button class="menu_btn icon_menu" aria-label="sidebar toggle" onclick="toggleSidebar()"></button>
        </div>
        <div class="sidebar_inner">
            <div class="sidebar_menu">
                <a href="" class="icon_dashboard current">
                    <span>Dashboard</span>
                </a>
                <a href="" class="icon_products">
                    <span>Find Contractor</span>
                </a>
                <a href="" class="icon_contact">
                    <span>Preferred</span>
                </a>
                <a href="" class="icon_stock">
                    <span>Manage Custom Fields</span>
                </a>
                <a href="" class="icon_file">
                    <span>PM Tools</span>
                </a>
                <a href="" class="icon_contact">
                    <span>Manage Teams</span>
                </a>
                <a href="" class="icon_chart">
                    <span>User Management</span>
                </a>
                <a href="" class="icon_chat">
                    <span>Manage founds</span>
                </a>
            <a href="" class="icon_invoice">
                    <span>Payment Methods</span>
                </a>
                
                
                <a href="" class="icon_lists">
                    <span>Templates</span>
                </a>
            </div>
            <button class="logout_btn icon_logout" aria-label="logout">
                <span>Log out</span>
            </button>
        </div>
    </div>
</div>

<script>
    toggleSidebar = function() {
        document.querySelector('.sidebar').classList.toggle('opened')
    }

    showProfileModal = function() {
        document.querySelector('.profile_inner').classList.add('opened')
    }

    hideProfileModal = function() {
        document.querySelector('.profile_inner').classList.remove('opened')
    }
</script>
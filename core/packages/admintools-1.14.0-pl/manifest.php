<?php return array (
  'manifest-version' => '1.1',
  'manifest-attributes' => 
  array (
    'changelog' => '1.14.0-pl
==============
- Added ability to lock admin panel.

1.13.1-pl
==============
- Fixed a bug with the last update.

1.13.0-pl
==============
- Added a system setting to disable setting the authenticated user from "mgr" context for a guest user on a website.

1.12.2-pl
==============
- Optimized for utf8mb4.
- Fixed broken email authentication.
- Fixed bug with creating a new admin notes.

1.12.1-pl
==============
- Some bugfixes.

1.12.0-pl
==============
- Added package action management which allows to prevent from installing, uninstalling, updating and removing packages.

1.11.2-pl
==============
- Some code optimization (special thanks to Fi1osof).

1.11.1-pl
==============
- Fixed error in the names of the two last added system settings.
- Changed order of including css files.

1.11.0-pl
==============
- Added 2 system settings - "admintools_custom_css" and "admintools_custom_js" which allow to add to the manager interface custom style and javascript files.
- Tuned the purple theme.

1.10.1-beta
==============
- Added the \'purple\' color theme.
- Bugfixes.

1.10.0-beta
==============
- Added color themes.
- The resource tree can be moved to the right side.

1.9.0-pl
==============
- Added plugin interface with bound events.

1.8.2-pl
==============
- Added a checkbox "Create cache" to the resource form which allows to save the resource to the cache when you save it.
- Admin notes can be imported and exported.

1.8.1-beta
==============
- Fixed issue #8 with mbstring.

1.8.0-beta
==============
- Added alternative permissions for resources.
- Template link in the resource form is made as icon.
- The "description" and "introtext" fields now are resizable.

1.7.0-pl
==============
- Added animation for the main menu.
- Added system setting to disable templates and resources relationship.

1.6.0-pl
==============
- Added templates and resources relationship.

1.5.0-pl
==============
- Added user notes functionality.

1.4.1-pl
==============
- Made the alternate login interface in pure javascript. Remove the jQuery from the AdminLogin snippet.
- Automatic logout inactive or blocked user if he is logged in.

1.4.1-beta
==============
- Element names in the elements log are links now.
- Fixed bug of the email authorization.

1.4.0-beta
==============
- Backend users can authorize via email.
- Some code optimization.

1.3.0-pl
==============
- Added system setting for switching on/off the favorite elements function.
- Added ability to clear only the saved resource cache (system setting "clear_only resource_cache").
- Added system setting for hiding component description at menu "Extras".
- The list of the edited elements is getting from the system \'manager_log\' table.
- Added filter to the last edited elements grid.
- The user settings of the favorite elements and the system settings save to the extended field of the user (special thanks to Lukas Zahnd).
- Fixed some bugs (special thanks to Lukas Zahnd).

1.2.1-pl
==============
- Fixed bug with favorites elements.

1.2.0-pl
==============
- Added a log of recently edited elements to the tree toolbar.
- Switch off check the elements permission for users with sudo while the tree is building.
- Fixed some bugs.

1.1.1-pl
==============
- Fixed session array for admintools.

1.1.0-pl
==============
- Remember system settings state.
- Added system setting allowing to switch off check the elements permission while the tree is building.
- Show favorite elements without category folders.

1.0.2-pl
==============
- Personal setting for each user.

1.0.1-pl
==============
- Changed the cache path.

1.0.0-pl
==============
- Initial release.',
    'license' => 'GNU GENERAL PUBLIC LICENSE
   Version 2, June 1991
--------------------------

Copyright (C) 1989, 1991 Free Software Foundation, Inc.
59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

Preamble
--------

  The licenses for most software are designed to take away your
freedom to share and change it.  By contrast, the GNU General Public
License is intended to guarantee your freedom to share and change free
software--to make sure the software is free for all its users.  This
General Public License applies to most of the Free Software
Foundation\'s software and to any other program whose authors commit to
using it.  (Some other Free Software Foundation software is covered by
the GNU Library General Public License instead.)  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
this service if you wish), that you receive source code or can get it
if you want it, that you can change the software or use pieces of it
in new free programs; and that you know you can do these things.

  To protect your rights, we need to make restrictions that forbid
anyone to deny you these rights or to ask you to surrender the rights.
These restrictions translate to certain responsibilities for you if you
distribute copies of the software, or if you modify it.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must give the recipients all the rights that
you have.  You must make sure that they, too, receive or can get the
source code.  And you must show them these terms so they know their
rights.

  We protect your rights with two steps: (1) copyright the software, and
(2) offer you this license which gives you legal permission to copy,
distribute and/or modify the software.

  Also, for each author\'s protection and ours, we want to make certain
that everyone understands that there is no warranty for this free
software.  If the software is modified by someone else and passed on, we
want its recipients to know that what they have is not the original, so
that any problems introduced by others will not reflect on the original
authors\' reputations.

  Finally, any free program is threatened constantly by software
patents.  We wish to avoid the danger that redistributors of a free
program will individually obtain patent licenses, in effect making the
program proprietary.  To prevent this, we have made it clear that any
patent must be licensed for everyone\'s free use or not licensed at all.

  The precise terms and conditions for copying, distribution and
modification follow.


GNU GENERAL PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
---------------------------------------------------------------

  0. This License applies to any program or other work which contains
a notice placed by the copyright holder saying it may be distributed
under the terms of this General Public License.  The "Program", below,
refers to any such program or work, and a "work based on the Program"
means either the Program or any derivative work under copyright law:
that is to say, a work containing the Program or a portion of it,
either verbatim or with modifications and/or translated into another
language.  (Hereinafter, translation is included without limitation in
the term "modification".)  Each licensee is addressed as "you".

Activities other than copying, distribution and modification are not
covered by this License; they are outside its scope.  The act of
running the Program is not restricted, and the output from the Program
is covered only if its contents constitute a work based on the
Program (independent of having been made by running the Program).
Whether that is true depends on what the Program does.

  1. You may copy and distribute verbatim copies of the Program\'s
source code as you receive it, in any medium, provided that you
conspicuously and appropriately publish on each copy an appropriate
copyright notice and disclaimer of warranty; keep intact all the
notices that refer to this License and to the absence of any warranty;
and give any other recipients of the Program a copy of this License
along with the Program.

You may charge a fee for the physical act of transferring a copy, and
you may at your option offer warranty protection in exchange for a fee.

  2. You may modify your copy or copies of the Program or any portion
of it, thus forming a work based on the Program, and copy and
distribute such modifications or work under the terms of Section 1
above, provided that you also meet all of these conditions:

    a) You must cause the modified files to carry prominent notices
    stating that you changed the files and the date of any change.

    b) You must cause any work that you distribute or publish, that in
    whole or in part contains or is derived from the Program or any
    part thereof, to be licensed as a whole at no charge to all third
    parties under the terms of this License.

    c) If the modified program normally reads commands interactively
    when run, you must cause it, when started running for such
    interactive use in the most ordinary way, to print or display an
    announcement including an appropriate copyright notice and a
    notice that there is no warranty (or else, saying that you provide
    a warranty) and that users may redistribute the program under
    these conditions, and telling the user how to view a copy of this
    License.  (Exception: if the Program itself is interactive but
    does not normally print such an announcement, your work based on
    the Program is not required to print an announcement.)

These requirements apply to the modified work as a whole.  If
identifiable sections of that work are not derived from the Program,
and can be reasonably considered independent and separate works in
themselves, then this License, and its terms, do not apply to those
sections when you distribute them as separate works.  But when you
distribute the same sections as part of a whole which is a work based
on the Program, the distribution of the whole must be on the terms of
this License, whose permissions for other licensees extend to the
entire whole, and thus to each and every part regardless of who wrote it.

Thus, it is not the intent of this section to claim rights or contest
your rights to work written entirely by you; rather, the intent is to
exercise the right to control the distribution of derivative or
collective works based on the Program.

In addition, mere aggregation of another work not based on the Program
with the Program (or with a work based on the Program) on a volume of
a storage or distribution medium does not bring the other work under
the scope of this License.

  3. You may copy and distribute the Program (or a work based on it,
under Section 2) in object code or executable form under the terms of
Sections 1 and 2 above provided that you also do one of the following:

    a) Accompany it with the complete corresponding machine-readable
    source code, which must be distributed under the terms of Sections
    1 and 2 above on a medium customarily used for software interchange; or,

    b) Accompany it with a written offer, valid for at least three
    years, to give any third party, for a charge no more than your
    cost of physically performing source distribution, a complete
    machine-readable copy of the corresponding source code, to be
    distributed under the terms of Sections 1 and 2 above on a medium
    customarily used for software interchange; or,

    c) Accompany it with the information you received as to the offer
    to distribute corresponding source code.  (This alternative is
    allowed only for noncommercial distribution and only if you
    received the program in object code or executable form with such
    an offer, in accord with Subsection b above.)

The source code for a work means the preferred form of the work for
making modifications to it.  For an executable work, complete source
code means all the source code for all modules it contains, plus any
associated interface definition files, plus the scripts used to
control compilation and installation of the executable.  However, as a
special exception, the source code distributed need not include
anything that is normally distributed (in either source or binary
form) with the major components (compiler, kernel, and so on) of the
operating system on which the executable runs, unless that component
itself accompanies the executable.

If distribution of executable or object code is made by offering
access to copy from a designated place, then offering equivalent
access to copy the source code from the same place counts as
distribution of the source code, even though third parties are not
compelled to copy the source along with the object code.

  4. You may not copy, modify, sublicense, or distribute the Program
except as expressly provided under this License.  Any attempt
otherwise to copy, modify, sublicense or distribute the Program is
void, and will automatically terminate your rights under this License.
However, parties who have received copies, or rights, from you under
this License will not have their licenses terminated so long as such
parties remain in full compliance.

  5. You are not required to accept this License, since you have not
signed it.  However, nothing else grants you permission to modify or
distribute the Program or its derivative works.  These actions are
prohibited by law if you do not accept this License.  Therefore, by
modifying or distributing the Program (or any work based on the
Program), you indicate your acceptance of this License to do so, and
all its terms and conditions for copying, distributing or modifying
the Program or works based on it.

  6. Each time you redistribute the Program (or any work based on the
Program), the recipient automatically receives a license from the
original licensor to copy, distribute or modify the Program subject to
these terms and conditions.  You may not impose any further
restrictions on the recipients\' exercise of the rights granted herein.
You are not responsible for enforcing compliance by third parties to
this License.

  7. If, as a consequence of a court judgment or allegation of patent
infringement or for any other reason (not limited to patent issues),
conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot
distribute so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you
may not distribute the Program at all.  For example, if a patent
license would not permit royalty-free redistribution of the Program by
all those who receive copies directly or indirectly through you, then
the only way you could satisfy both it and this License would be to
refrain entirely from distribution of the Program.

If any portion of this section is held invalid or unenforceable under
any particular circumstance, the balance of the section is intended to
apply and the section as a whole is intended to apply in other
circumstances.

It is not the purpose of this section to induce you to infringe any
patents or other property right claims or to contest validity of any
such claims; this section has the sole purpose of protecting the
integrity of the free software distribution system, which is
implemented by public license practices.  Many people have made
generous contributions to the wide range of software distributed
through that system in reliance on consistent application of that
system; it is up to the author/donor to decide if he or she is willing
to distribute software through any other system and a licensee cannot
impose that choice.

This section is intended to make thoroughly clear what is believed to
be a consequence of the rest of this License.

  8. If the distribution and/or use of the Program is restricted in
certain countries either by patents or by copyrighted interfaces, the
original copyright holder who places the Program under this License
may add an explicit geographical distribution limitation excluding
those countries, so that distribution is permitted only in or among
countries not thus excluded.  In such case, this License incorporates
the limitation as if written in the body of this License.

  9. The Free Software Foundation may publish revised and/or new versions
of the General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

Each version is given a distinguishing version number.  If the Program
specifies a version number of this License which applies to it and "any
later version", you have the option of following the terms and conditions
either of that version or of any later version published by the Free
Software Foundation.  If the Program does not specify a version number of
this License, you may choose any version ever published by the Free Software
Foundation.

  10. If you wish to incorporate parts of the Program into other free
programs whose distribution conditions are different, write to the author
to ask for permission.  For software which is copyrighted by the Free
Software Foundation, write to the Free Software Foundation; we sometimes
make exceptions for this.  Our decision will be guided by the two goals
of preserving the free status of all derivatives of our free software and
of promoting the sharing and reuse of software generally.

NO WARRANTY
-----------

  11. BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY
FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW.  EXCEPT WHEN
OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES
PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED
OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.  THE ENTIRE RISK AS
TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU.  SHOULD THE
PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING,
REPAIR OR CORRECTION.

  12. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR
REDISTRIBUTE THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES,
INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING
OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED
TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY
YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER
PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGES.

---------------------------
END OF TERMS AND CONDITIONS',
    'readme' => '--------------------
AdminTools
--------------------
Author: Sergey Shlokov <sergant210{at}bk.ru>
--------------------

A basic Extra for MODx Revolution Administrators.

Feel free to suggest ideas/improvements/bugs on GitHub:
http://github.com/sergant210/AdminTools/issues',
    'chunks' => 
    array (
      'tpl.login.form' => '<div id="container">
	<div id="modx-login-logo">
		<!--[if gte IE 9]><!--><img src="/manager/templates/default/images/modx-logo-color.svg" alt="MODX CMS/CMF"><!--<![endif]-->
		<!--[if lt IE 9]><img alt="MODX CMS/CMF" src="/manager/templates/default/images/modx-logo-color.png" /><![endif]-->
	</div>

	<div class="modx-form" id="modx-login-panel">
		<div class="panel-title">
			<h2>[[++site_name]]</h2>
		</div>
		<div id="errormsg">[[+errormsg]]</div>
		<div class="panel-body">
			<form method="post" action="" id="manager-login-form">
				<div class="login-form-item">
					<div class="login-form-element">
						<input type="text" placeholder="[[%admintools_username_email]]" class="form-text" name="userdata" id="userdata" autocomplete="on">
					</div>
				</div>
				<div class="form-action">
					<button id="send-email-btn" value="1" type="button" class="primary-button login-form-btn">[[%admintools_send_authorization_link]]</button>
				</div>
			</form>
		</div>
	</div>
</div>',
      'tpl.lockScreen' => '<!DOCTYPE html>
<html lang="[[+lang]]">
<head>
	<meta charset="UTF-8">
	<title>[[+title]]</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<style>
		.lockscreen {
			background-image: url([[+assets_url]]components/admintools/images/lockscreen.jpg);
		}
		@media only screen and (max-width : 767px) {
			.lockscreen {
				background-image: url([[+assets_url]]components/admintools/images/lockscreen800.jpg);
			}
		}
		@media only screen and (min-width : 768px) and (max-width: 1223px) {
			.lockscreen {
				background-image: url([[+assets_url]]components/admintools/images/lockscreen1280.jpg);
			}
		}
		.lockscreen .container {
			background-color: rgba(255,255,255,0.1);
			margin: 5% auto 0;
			padding: 20px;
			text-align: center;
			width: 250px;
		}
		.lockscreen .form-element {
			box-sizing: border-box;
			font-size: 14px;
			margin: 5px 0;
			padding: 6px 12px;
			width: 220px;
		}
		.lockscreen .username {
			font-size: 20px;
			color: #fff;
			padding: 10px;
		}
		.lockscreen input {
			border: 1px solid transparent;
		}
		.lockscreen input:focus {
			border-color: #45a2ec;
			outline: 0;
		}
		.lockscreen .btn {
			display: inline-block;
			color: #fff;
			background-color: #3697CD;
			font-weight: bold;
			line-height: 1.6;
			text-align: center;
			vertical-align: middle;
			cursor: pointer;
			border: 1px solid #3CA4DE;
		}
		.btn:hover {
			color: #fff;
			background-color: #286090;
			border-color: #1e4c74;
		}
	</style>
</head>
<body class="lockscreen">
<div class="container">
	<div class="photo"><img src="[[+photo]]" alt="avatar" onsubmit="return false;"></div>
	<div class="username">[[+username]]</div>
	<form name="unlockform" action="[[+form_action]]" method="POST">
		<div>
			<input id="unlock_code" class="form-element" type="password" name="unlock_code" placeholder="[[%admintools_enter_password_or_unlockcode]]" required>
		</div>
		<div>
			<button class="form-element btn submit-btn">[[%admintools_unlock]]</button>
		</div>
	</form>
</div>
<script>
	document.forms[0].addEventListener("submit", function(event) {
		event.preventDefault();
		let body = "admintools_action=unlock&action=mgr/system/unlock&unlock_code=" + encodeURIComponent(unlock_code.value) + "&HTTP_MODAUTH=[[+auth]]";
		let xhr = new XMLHttpRequest();
		xhr.open(this.getAttribute(\'method\'), this.getAttribute(\'action\'), true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.setRequestHeader(\'Content-Type\', \'application/x-www-form-urlencoded\');
		xhr.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.location.reload();
			}
		};

		xhr.send(body);
	});
</script>
</body>
</html>',
    ),
    'setup-options' => 'admintools-1.14.0-pl/setup-options.php',
  ),
  'manifest-vehicles' => 
  array (
    0 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modNamespace',
      'guid' => '74492fdd930a2d3ce401fdf6060f6c42',
      'native_key' => 'admintools',
      'filename' => 'modNamespace/af3a3596e5347a1684c2ee54c3672444.vehicle',
      'namespace' => 'admintools',
    ),
    1 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '013188aaf018b2a6051615c281217b2f',
      'native_key' => 'admintools_favorites_icon',
      'filename' => 'modSystemSetting/829f7394507400448249d302d6c3a9b0.vehicle',
      'namespace' => 'admintools',
    ),
    2 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '3bff2155f932a288148d29dbbfb163f9',
      'native_key' => 'admintools_check_elements_permissions',
      'filename' => 'modSystemSetting/99223d52867e21e340e0c11deab54eba.vehicle',
      'namespace' => 'admintools',
    ),
    3 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => 'a4d9106a6ebb992345b5374e86445753',
      'native_key' => 'admintools_remember_system_settings',
      'filename' => 'modSystemSetting/86fc2bf3cc0a8c3e2eb93ea75d18a190.vehicle',
      'namespace' => 'admintools',
    ),
    4 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => 'fe973ff6eeaf7b3a9fb4ab603ead1643',
      'native_key' => 'admintools_enable_elements_log',
      'filename' => 'modSystemSetting/f05f559d6fa7fdd9d9a04596b55681a9.vehicle',
      'namespace' => 'admintools',
    ),
    5 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '4a7887133cbb0626f9338ee9e6cb9a91',
      'native_key' => 'admintools_enable_favorite_elements',
      'filename' => 'modSystemSetting/d6ab9afe3e5826da83b3821c1b5c25d4.vehicle',
      'namespace' => 'admintools',
    ),
    6 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '696a084c5155d240bbea2e4b6f610025',
      'native_key' => 'admintools_clear_only_resource_cache',
      'filename' => 'modSystemSetting/9bf8b7e68c431a42c66bbb31081eb3df.vehicle',
      'namespace' => 'admintools',
    ),
    7 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => 'ee3b48d815254dc714dc120eb5647cbc',
      'native_key' => 'admintools_hide_component_description',
      'filename' => 'modSystemSetting/674c5511d64189ca62f09eb4763f29e9.vehicle',
      'namespace' => 'admintools',
    ),
    8 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '2d503c6999b9fe277e0b850c4d12c76d',
      'native_key' => 'admintools_email_authorization',
      'filename' => 'modSystemSetting/329747a7707d9e6be76b9a5ea650b4d2.vehicle',
      'namespace' => 'admintools',
    ),
    9 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '8ba99a963c0d2a5c6ca8e57f8275cb49',
      'native_key' => 'admintools_authorization_ttl',
      'filename' => 'modSystemSetting/79b83a5f7f31a0454bc94fecb72c98a1.vehicle',
      'namespace' => 'admintools',
    ),
    10 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '991bead115e70bd2ba986d7a9a307b70',
      'native_key' => 'admintools_loginform_resource',
      'filename' => 'modSystemSetting/7a244e373280de709bb511121f7d5cfc.vehicle',
      'namespace' => 'admintools',
    ),
    11 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '5e2fd214f01825157ece25043638c319',
      'native_key' => 'admintools_enable_notes',
      'filename' => 'modSystemSetting/4e0a78c0b88fa0fdbfb9861b4dbcfc8e.vehicle',
      'namespace' => 'admintools',
    ),
    12 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => 'd878805ddd09b8cb92ce7cdf43601569',
      'native_key' => 'admintools_template_resource_relationship',
      'filename' => 'modSystemSetting/e2329be44b35eea63691a719f2e9542f.vehicle',
      'namespace' => 'admintools',
    ),
    13 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '665c505adb618f3f26e9390cd248033c',
      'native_key' => 'admintools_animate_menu',
      'filename' => 'modSystemSetting/944fbb15d60cdfa02e412f1f772cf624.vehicle',
      'namespace' => 'admintools',
    ),
    14 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '516904a9af95c6905d7cb0bdc49ebe20',
      'native_key' => 'admintools_alternative_permissions',
      'filename' => 'modSystemSetting/e0d918e9c323db3e910d18bd281aebe4.vehicle',
      'namespace' => 'admintools',
    ),
    15 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '195984d689788fc2ca0455882a0ca712',
      'native_key' => 'admintools_plugins_events',
      'filename' => 'modSystemSetting/57253f99ab75767600531ff14614f390.vehicle',
      'namespace' => 'admintools',
    ),
    16 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '4c03e13c6912dbdf37a8254b441b2b6c',
      'native_key' => 'admintools_theme',
      'filename' => 'modSystemSetting/09e0cafc68e5099d414de259023f0f4f.vehicle',
      'namespace' => 'admintools',
    ),
    17 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '274271f7ebef9d9f7f4e4c87e67130ab',
      'native_key' => 'admintools_modx_tree_position',
      'filename' => 'modSystemSetting/44b0a501defbbc7042fc67856bd73f6f.vehicle',
      'namespace' => 'admintools',
    ),
    18 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '25ca9eae0bc13a1629b1aef7cfe3ced5',
      'native_key' => 'admintools_custom_css',
      'filename' => 'modSystemSetting/8f63498d2702746153da344e2a0be3cb.vehicle',
      'namespace' => 'admintools',
    ),
    19 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '188ea4efa60eee8e10f7af2732933768',
      'native_key' => 'admintools_custom_js',
      'filename' => 'modSystemSetting/3352ef18fa7c04d816605609061a153e.vehicle',
      'namespace' => 'admintools',
    ),
    20 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '96c0f6c456f3e2bfec4421fe1a64ce66',
      'native_key' => 'admintools_package_actions',
      'filename' => 'modSystemSetting/734933c6d9a7a14cf46f284ea48411f0.vehicle',
      'namespace' => 'admintools',
    ),
    21 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => 'ea823f5f333200714a254910948472da',
      'native_key' => 'admintools_only_current_context_user',
      'filename' => 'modSystemSetting/90d2163797034bb20e0baf4bf5b54690.vehicle',
      'namespace' => 'admintools',
    ),
    22 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '9a38ba4829aa97f16df8bb7ace82c374',
      'native_key' => 'admintools_lock_timeout',
      'filename' => 'modSystemSetting/d935bd4ca591e19e6dfe5ca44cd20084.vehicle',
      'namespace' => 'admintools',
    ),
    23 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modSystemSetting',
      'guid' => '7490389086c0cca954bdaf9650d02f40',
      'native_key' => 'admintools_unlock_code',
      'filename' => 'modSystemSetting/b4174ed9bf3000f5713acdebc674653f.vehicle',
      'namespace' => 'admintools',
    ),
    24 => 
    array (
      'vehicle_package' => 'transport',
      'vehicle_class' => 'xPDOObjectVehicle',
      'class' => 'modCategory',
      'guid' => '96e0800cd190fddf07f9a21cf463d5cd',
      'native_key' => NULL,
      'filename' => 'modCategory/a7342d7bad54e37019684009bd50437a.vehicle',
      'namespace' => 'admintools',
    ),
  ),
);
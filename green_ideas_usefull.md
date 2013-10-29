Για πρόσβαση στο www.agroknow.gr/greenideas ισχύουν :
host:ftp.agroknow.gr
u:greenideasdemo
p:gr33n1d3@sdemo!

για backend:
http://www.agroknow.gr/greenideas/demo/user
U:admin
P:greenpass

*Changes for Drupal*

*1)Αφαίρεσα html,head,body tags και πρόσθεσα στην αρχή του αρχείου (για index.html ανάλογα κ για τα υπόλοιπα)*

<?php
	$css = drupal_get_path('module', 'ak_search_teo')."/edu/css";
	$js =  drupal_get_path('module', 'ak_search_teo')."/edu/js";
	$im =  drupal_get_path('module', 'ak_search_teo')."/edu/images";
	?>
	
	και επομένως τα declarations για το css k js έγιναν:
	
<link rel="stylesheet/less" type="text/css" media="screen" href="<?php echo $css; ?>/ak-style.less" />
<script src="<?php echo $js ?>/less-1.5.0.min.js" type="text/javascript"></script>

*2)τα listing.html,index.html,item.html μέσα στα συγκεκριμένα αρχεία θα αντικατασταθούν με*
<?php echo url('ak_search_teo_listing');?> 
<?php echo url('ak_search_teo_index');?> 
<?php echo url('ak_search_teo_item');?>
αντίστοιχα . 
πχ το :
<a href="listing.html?query=*&audience=teacher&lrt=pathway" class="le0">Event's pathway</a> θα γίνει:
<a href="<?php echo url('ak_search_teo_listing');?>?query=*&audience=teacher&lrt=pathway" class="le0">Event's pathway</a>

*3)Tα παραπάνω θα τα έχω στην διαθεσή μου από ένα javascript object για χρήση στα js.*
Αυτό θα είναι το drupalVariables και συγκεκριμένα:
drupalVariables.impath (το path για to /edu/images)
drupalVariables.indexurl (το path για to index page)
drupalVariables.listingurl (το path για to listing page)
drupalVariables.itemurl (το path για to item page)
Έχοντας αυτό σαν δεδομένο η γραμμή 664 του finder.js έγινε :
div({cls: 'moreinfo'}, a({href: drupalVariables.itemurl+"?id=" + id, title: 'View all data of this item.', cls: 'moreinfo'}, "View Full Info"))) για να δουλεύει σωστά το link  more info στο listing page.
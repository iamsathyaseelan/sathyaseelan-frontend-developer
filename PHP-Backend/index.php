<?php
if ( ! empty( $_GET['capsules'] ) ) {
	$response = "{}";
	if ( ! empty( $_SERVER['PHP_AUTH_USER'] ) && ! empty( $_SERVER['PHP_AUTH_PW'] ) ) {
		if ( $_SERVER['PHP_AUTH_USER'] == "sathyaseelan" && $_SERVER['PHP_AUTH_PW'] == "test" ) {
			$response = file_get_contents( "https://api.spacexdata.com/v3/capsules" );
		} else {
			$response = json_encode( array( "success" => false, "message" => "Authorization failed." ) );
		}
	} else {
		$response = json_encode( array( "success" => false, "message" => "Authorization failed." ) );
	}
	header( "Access-Control-Allow-Origin: *" );
	header( "Access-Control-Allow-Credentials: true" );
	header( "Access-Control-Max-Age: 1000" );
	header( "Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding" );
	header( "Access-Control-Allow-Methods: GET" );
	header( 'Content-Type: application/json' );
	echo $response;
	die;
}

<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(400);

    exit();
}

$subjectEmail = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$messageEmail = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$fromEmail = filter_input(INPUT_POST, 'from', FILTER_SANITIZE_EMAIL);

if (!isset($subjectEmail) || !isset($messageEmail) || !isset($fromEmail)) {
    http_response_code(400);

    exit();
}

$cabeceras = "From: $fromEmail" . "\r\n";

$sent = mail(getenv('email'), $subjectEmail, $messageEmail, $cabeceras);

if (!$sent) {
    http_response_code(400);

    exit();
}
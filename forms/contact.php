<?php
            // Define variables and initialize with empty values
            $name = $email = $subject = $message = "";
            $name_err = $email_err = $subject_err = $message_err = "";
            $success_message = "";
            
            // Processing form data when form is submitted
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                
                // Validate name
                if (empty(trim($_POST["name"]))) {
                    $name_err = "Please enter your name.";
                } else {
                    $name = trim($_POST["name"]);
                    // Check if name contains only letters and whitespace
                    if (!preg_match("/^[a-zA-Z ]*$/", $name)) {
                        $name_err = "Only letters and white space allowed.";
                    }
                }
                
                // Validate email
                if (empty(trim($_POST["email"]))) {
                    $email_err = "Please enter your email address.";
                } else {
                    $email = trim($_POST["email"]);
                    // Check if email address is well-formed
                    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $email_err = "Invalid email format.";
                    }
                }
                
                // Validate subject
                if (empty(trim($_POST["subject"]))) {
                    $subject_err = "Please enter a subject.";
                } else {
                    $subject = trim($_POST["subject"]);
                }
                
                // Validate message
                if (empty(trim($_POST["message"]))) {
                    $message_err = "Please enter your message.";
                } else {
                    $message = trim($_POST["message"]);
                }
                
                // Check input errors before sending email
                if (empty($name_err) && empty($email_err) && empty($subject_err) && empty($message_err)) {
                    
                    // Recipient email (replace with your real receiving email address)
                    $to = "devspire.agency@gmail.com";
                    
                    // Create email headers
                    $headers = "From: " . $email . "\r\n";
                    $headers .= "Reply-To: " . $email . "\r\n";
                    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
                    
                    // Email content
                    $email_content = "Name: $name\n";
                    $email_content .= "Email: $email\n\n";
                    $email_content .= "Message:\n$message\n";
                    
                    // Send email
                    if (mail($to, $subject, $email_content, $headers)) {
                        $success_message = "Your message has been sent successfully!";
                        
                        // Clear form fields
                        $name = $email = $subject = $message = "";
                    } else {
                        $success_message = "Oops! Something went wrong. Please try again later.";
                    }
                }
            }
            ?>
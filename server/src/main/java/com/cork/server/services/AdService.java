package com.cork.server.services;

import java.util.List;
import java.util.Optional;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.cork.server.models.Ad;
import com.cork.server.models.ContactMessage;
import com.cork.server.repositories.AdRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class AdService {

    @Autowired
    private AdRepository adRepo;

    @Autowired
    private JavaMailSender mailSender;

    public List<Ad> allAds(String category) {
        System.out.println(category);
        if (category.equals("all")) {
            return adRepo.findAll();
        } else {
            return adRepo.findByCategory(category);
        }
    }

    public Ad oneAd(Long id) {
        Optional<Ad> optionalAd = adRepo.findById(id);
        if (optionalAd.isPresent()) {
            return optionalAd.get();
        }
        return null;
    }

    public Ad createAd(Ad ad) {
        // inject location of the image file
        Ad newAd = adRepo.save(ad);

        // send the automated HTML e-mail
        String title = newAd.getTitle();
        String image = newAd.getImage();
        Double price = newAd.getPrice();
        String city = newAd.getCity();
        String state = newAd.getState();
        String description = newAd.getDescription();
        String email = newAd.getEmail();
        Long adId = newAd.getId();

        String from = "cork.noreply@gmail.com";
        String to = email;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            String mailSubject = "Here's you're new Cork Ad listing";

            String mailContent = "<!doctype html>\n" +
                    "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\"\n" +
                    "<head>\n" +
                    "    <meta charset=\"UTF-8\">\n" +
                    "    <meta name=\"viewport\"\n" +
                    "          content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n"
                    +
                    "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
                    "    <title>Email</title>\n" +
                    "</head>\n" +
                    "<body>\n" +
                    "<h2 align='center' style=''>Would you like to change or delete your listing?</h2>" +
                    "<h2 align='center' style=''><a href='http://localhost:3000/details/"
                    + adId + "'>View Your Listing</a><p></p><a href='http://localhost:3000/edit_ad/"
                    + adId + "'>Edit</a><p></p><a href='http://localhost:3000/delete/"
                    + adId + "'>Delete</a></h2>"
                    +
                    "<h2 align='center' style=''>" + title + "</h2>" +
                    "<h3 align='center' style=''>Price: " + price + "</h3>" +
                    "<h3 align='center' style=''>Location: " + city + ", " + state + "</h3>" +
                    "<h3 align='center' style=''>"
                    + description + "</h3>" +
                    "<p><img align='center' src='cid:adImage' style='' /></p>" +

                    "</body>\n" +
                    "</html>\n";

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(mailSubject);
            helper.setText(mailContent, true);

            DataSource adImage = new FileDataSource(
                    // C: is absolute patth, \\ is relative path
                    "C:/Users/Rangel/Desktop/cork/client/src/static/images/adImages/" + image);
            helper.addInline("adImage", adImage);

            System.out.println(message);
            mailSender.send(message);

        } catch (MessagingException me) {
            throw new RuntimeException(me);
        }

        return newAd;
    }

    public Ad contactSeller(ContactMessage contactMessage) {

        Optional<Ad> optionalMessage = adRepo.findById(contactMessage.getId());

        if (optionalMessage.isPresent()) {

            // Seller
            String recieverEmail = optionalMessage.get().getEmail();

            // Interested buyer
            String subject = contactMessage.getSubject();
            String message = contactMessage.getMessage();
            String senderEmail = contactMessage.getEmail();

            String from = senderEmail;
            String to = recieverEmail;

            try {
                MimeMessage formattedMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(formattedMessage, true);

                String mailSubject = subject;
                String mailContent = "<!doctype html>\n" +
                        "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\"\n" +
                        "<head>\n" +
                        "    <meta charset=\"UTF-8\">\n" +
                        "    <meta name=\"viewport\"\n" +
                        "          content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\">\n"
                        +
                        "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n" +
                        "    <title>Email</title>\n" +
                        "</head>\n" +
                        "<body>\n" +
                        "<h2 style=''>Interested Buyer's E-mail:   " + senderEmail + "</h2>" +
                        "<h2 style='display:flex; flex-wrap: wrap; justify-content:center; width: 100px; margin-top: 35px;  border-radius: 5px; padding: 10px'>Message:     "
                        + "</h2>" +
                        "<h2>" + message + "</h2>" +
                        "</body>\n" +
                        "</html>\n";

                helper.setFrom(from);
                helper.setTo(to);
                helper.setSubject(mailSubject);
                helper.setText(mailContent, true);

                // System.out.println(formattedMessage);
                mailSender.send(formattedMessage);

            } catch (MessagingException me) {
                throw new RuntimeException(me);
            }

        }
        return null;

    }

    public Ad updateAd(Ad ad) {
        Optional<Ad> dbAd = adRepo.findById(ad.getId());
        if (dbAd.isPresent()) {
            System.out.println("Found");
            ad.setEmail(dbAd.get().getEmail());
            return adRepo.save(ad);
        } else {
            return null;
        }
    }

    public void deleteAd(Long id) {
        adRepo.deleteById(id);
    }

}

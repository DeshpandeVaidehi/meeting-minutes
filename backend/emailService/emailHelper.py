import smtplib
import os

def sendMail(body,target):
	smtp_ssl_host='smtp.gmail.com'
	smtp_ssl_port=465
	ID=os.environ['MAIL_ID']
	PSSWRD = os.environ['MAIL_PSSWRD']
	print("Connecting to SMTP server")
	try:
		server_ssl = smtplib.SMTP_SSL(smtp_ssl_host,smtp_ssl_port)
		print("Connection successful")
	except Exception as e:
		print("Oops something went wrong, unable to communicate to gmail server")
		print(str(e))
	print("Logging in")
	try:
		server_ssl.login(ID,PSSWRD);
	except Exception as e:
		print("Error with credentials")
		print(e)
	print("Successfully logged")
	try:
		server_ssl.sendmail(from_addr=ID,to_addrs=target,msg=body)
		server_ssl.quit()
	except Exception as e:
		print("Error while sending mail")
	print("successfully sent mail")
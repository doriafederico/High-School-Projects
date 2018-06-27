package com.example.studente.wsclient;

import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.telecom.Call;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;


public class MainActivity extends AppCompatActivity {
    TextView t,tRis;
    Button btn;
    EditText edt;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        t=findViewById(R.id.textView);
        tRis=findViewById(R.id.txtRis);
        btn=findViewById(R.id.btn1);
        edt=findViewById(R.id.Txt1);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String s1=edt.getText().toString();
                new CallWebService().execute(s1);
            }
        });
    }

    class CallWebService extends AsyncTask<String, String, String> {

        private final String NAMESPACE = "http://pkgws/";
        private final String URL = "http://Federico:8080/WSServer/WS?WSDL";
        private final String METHOD_NAME = "getHobby";
        private final String SOAP_ACTION = "";


        @Override
        protected String doInBackground(String... strings) {
            try {
                SoapObject request = new org.ksoap2.serialization.SoapObject(NAMESPACE, METHOD_NAME);
                request.addProperty("hobby", strings[0]);
                SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(SoapEnvelope.VER11);
                envelope.setOutputSoapObject(request);
                HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
                try {
                    androidHttpTransport.call(SOAP_ACTION, envelope);
                    SoapObject response = (SoapObject) envelope.bodyIn;


                    return response.getProperty(0).toString();
                } catch (Exception e) {
                    e.printStackTrace();

                }
            } catch (Exception e) {
                e.printStackTrace();

            }
            return null;
        }

       @Override
       protected void onPostExecute(String s) {
           super.onPostExecute(s);
           tRis.setText(s);
       }
   }

}
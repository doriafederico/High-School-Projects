package com.example.fede.Flags;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    Intent intent;
    PendingIntent flag;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void startAlert(View view) {
        EditText text = findViewById(R.id.time);
        int delay = Integer.parseInt(text.getText().toString());

        AlarmManager alarmManager = (AlarmManager) getSystemService(ALARM_SERVICE);
        alarmManager.set(AlarmManager.RTC_WAKEUP, System.currentTimeMillis()
                + (delay * 1000), flag);

        Toast.makeText(this, "... aspetto " + delay + " secondi",
                Toast.LENGTH_LONG).show();
    }

    public void onRadioButtonClicked(View view) {
        intent = new Intent(this, MyBroadcastReceiver.class);
        switch (view.getId()) {
            case R.id.FLAG_IMMUTABLE:
            flag = PendingIntent.getBroadcast(this, 1234567890, intent, PendingIntent.FLAG_IMMUTABLE);
                break;
            case R.id.FLAG_CANCEL_CURRENT:
                    flag = PendingIntent.getBroadcast(this, 1234567890, intent, PendingIntent.FLAG_CANCEL_CURRENT);
                break;
            case R.id.FLAG_NO_CREATE:
                    flag = PendingIntent.getBroadcast(this, 1234567890, intent, PendingIntent.FLAG_NO_CREATE);
                break;
            case R.id.FLAG_UPDATE_CURRENT:
                    flag = PendingIntent.getBroadcast(this, 1234567890, intent, PendingIntent.FLAG_UPDATE_CURRENT);
                break;
            case R.id.FLAG_ONE_SHOT:
                flag = PendingIntent.getBroadcast(this, 1234567890, intent, PendingIntent.FLAG_ONE_SHOT);
                break;
        }
    }


}

package com.selflearingapp

import android.os.Bundle
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView


class VideoPlayActivity : AppCompatActivity() {
    protected var playerView: PlayerView? = null
    protected var debugRootView: LinearLayout? = null
    protected var debugTextView: TextView? = null
    private var selectTracksButton: Button? = null
    protected var player: ExoPlayer? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(
            R.layout.activity_video_play
        )
        debugRootView = findViewById(R.id.controls_root);
        debugTextView = findViewById(R.id.debug_text_view);
        selectTracksButton = findViewById(R.id.select_tracks_button);

        playerView = findViewById(R.id.player_view);

        val player = ExoPlayer.Builder(this).build()
        playerView?.player = player
        val mediaItem =
            MediaItem.fromUri("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4")
        player.setMediaItem(mediaItem)
        player.prepare()
        player.play()
    }

    override fun onDestroy() {
        super.onDestroy()
        player?.release()
    }
}
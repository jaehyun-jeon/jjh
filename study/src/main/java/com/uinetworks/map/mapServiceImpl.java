package com.uinetworks.map;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uinetworks.chart.chartVo;

@Service
public class mapServiceImpl implements mapService {

	@Autowired
	mapDao dao;
	
	public List<chartVo> getclickMapSearchPoint(chartVo vo) {

		return dao.getclickMapSearchPoint(vo);
	}
	
}

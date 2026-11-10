# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 10/11/2026, 20:26:56. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (7049 linhas)

16: <!-- Tailwind CSS CDN -->
36: <!-- Font Awesome Icons -->
38: <!-- PDF.js para renderizar PDFs -->
40: <!-- Gera o QR code do Pix a partir do copia e cola -->
42: <!-- Supabase (banco de dados online) -->
160: <!-- Header Principal -->
174: <!-- Controles do Header -->
176: <!-- Botão Status Online/Offline (Motorista) -->
184: <!-- Ativar Notificações -->
189: <!-- Temas -->
194: <!-- Logout Button -->
203: <!-- Conteúdo Principal -->
206: <!-- TELA DE LOGIN -->
207: #secLogin
240: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
241: #secDemoEscolha
256: <!-- PAINEL DO MOTORISTA -->
257: #secDriverPanel
259: <!-- Card do Veículo Vinculado -->
274: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
284: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
289: <!-- Aviso: nova versão do app Android -->
292: <!-- Aviso vermelho: notificações desligadas -->
295: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
299: <!-- Aviso de Pix / pagamento pendente -->
302: <!-- Navegação de Abas -->
320: <!-- Conteúdo das Abas Motorista -->
323: <!-- Aba CRLV-e -->
324: #tabDrvCrlv
329: <!-- Renderizado dinamicamente -->
333: <!-- Aba Contrato -->
334: #tabDrvContract
344: <!-- Renderizado dinamicamente -->
348: <!-- Aba Vistoria -->
349: #tabDrvInspection
356: <!-- Aba Pagamento -->
357: #tabDrvPayment
370: <!-- Caução e multas do motorista -->
372: <!-- Valor e descrição da cobrança -->
382: <!-- Seção Pix -->
395: <!-- QR Code Renderizado aqui -->
420: <!-- Seção Upload de Comprovante -->
437: <!-- Lista de comprovantes -->
447: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
448: #secMasterPanel
481: <!-- Aviso: falta criar a tabela dos termos no banco -->
484: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
486: <!-- Lista de Veículos -->
502: <!-- Renderizado via JS -->
509: <!-- Form de Adicionar Veículo -->
543: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
549: <!-- Lista de Motoristas -->
566: <!-- Renderizado via JS -->
573: <!-- Form de Adicionar Motorista -->
668: <!-- Barra de baixo do dono (só no design novo) -->
678: <!-- MODAL PRIMEIRO LOGIN -->
679: #modalFirstLogin
713: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
714: #modalNotif
727: <!-- MODAL VISTORIA (MASTER) -->
728: #modalInspection
741: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
742: #modalSettings
801: <!-- MODAL TEMAS -->
802: #modalThemes
813: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
814: #modalCreds
829: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
830: #modalDriverFile
894: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
909: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
951: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
952: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
953: #modalRecibo
972: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
973: #modalPixArea
989: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
990: #modalIA
1072: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1073: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1074: #modalEditVeh
1093: #modalSenha
1115: #modalMeusRecibos
1133: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1134: #modalEmail
1154: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1155: #modalReport
1170: #modalFinance
1223: <!-- FILTROS -->
1271: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1291: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1292: #modalExpenses
1327: <!-- MODAL NOVO PIX -->
1328: #modalNewPix
1380: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1438: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1439: #modalCorrigirRecibo
1453: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
1454: #modalDocViewer
1462: #modalDocBody
1463: <!-- Conteúdo pré-visualizado -->
1469: #modalTerms
1483: <!-- NOTIFICAÇÕES TOAST -->
1500: lsGet()
1501: lsSet()
1502: lsDel()
1525: demoLoginRole()
1529: demoId()
1530: demoSave()
1531: demoSaved()
1533: *datas no horário de Brasília*
1534: demoLocal()
1535: demoParts()
1536: demoDay()
1537: demoNextDue()
1542: *dados fictícios (4 meses)*
1543: demoBuild()
1686: *documentos fictícios (imagem gerada na hora)*
1687: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
1688: demoDocBlob()
1766: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
1767: demoQuery()
1790: out()
1796: run()
1837: demoOnUpdate()
1847: demoOnInsert()
1914: demoClient()
1979: demoStart()
1987: demoStop()
1993: abrirDemo()
2000: trocarDemo()
2005: demoBanner()
2020: toEmail()
2024: showLogin()
2028: esc()
2032: friendlyError()
2042: devicePrefs()
2045: saveDevicePrefs()
2048: docRef()
2049: viewDocIdx()
2051: setBusy()
2089: **TEMAS**
2098: currentTheme()
2103: applyTheme()
2110: openThemes()
2120: pickTheme()
2126: toggleDarkMode()
2128: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
2130: loadDesignCfg()
2137: applyDesign()
2156: markMasterNav()
2161: fillDesignCfg()
2165: saveDesign()
2179: showToast()
2188: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
2189: senhaErro()
2190: abrirSenha()
2199: salvarIaCodigo()
2209: fecharSenha()
2210: salvarSenha()
2231: loginUserInput()
2236: loginErro()
2240: verSenha()
2245: handleLogin()
2294: logout()
2313: saveFirstLoginPreferences()
2335: loadAndRender()
2389: autoRefresh()
2428: markUpdated()
2433: reload()
2438: renderApp()
2486: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
2489: masterBack()
2491: viewAsDriver()
2513: exitViewAs()
2532: viewOnly()
2533: renderViewAsBanner()
2543: showSection()
2549: toggleDriverStatus()
2558: isOnline()
2560: updateStatusToggleUI()
2573: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
2582: checkApkUpdate()
2597: updateInstallApkButton()
2617: renderDriverPanel()
2786: switchDriverTab()
2801: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
2804: parsePixKey()
2808: normalizePixKey()
2816: pixKeyLooksOk()
2824: togglePixKeyFields()
2830: updatePixKeyPlaceholder()
2836: copyPixKey()
2843: copyPixCode()
2855: receiptBadge()
2865: receiptMasterBox()
2890: receiptAction()
2897: confirmReceipt()
2904: rejectReceipt()
2913: recheckReceipt()
2922: uploadReceipt()
2945: switchMasterTab()
2962: maskPhone()
2971: waLink()
2976: allVeh()
2977: renderMasterPanel()
3090: handleAddVehicle()
3123: deleteVehicle()
3124: cancelDeleteVehicle()
3126: confirmDeleteVehicle()
3144: abrirEditarVeiculo()
3163: fecharEditarVeiculo()
3164: salvarEditarVeiculo()
3194: drvCauMostra()
3201: drvCauLer()
3208: handleAddDriver()
3285: updateDriverPaymentStatus()
3294: deleteDriver()
3295: cancelDeleteDriver()
3297: confirmDeleteDriver()
3314: prepareFile()
3336: uploadFile()
3347: fileUrl()
3358: downloadName()
3362: renderFilePreview()
3382: renderPdfToCanvas()
3409: viewDoc()
3430: **DINHEIRO**
3431: parseMoney()
3438: fmtMoney()
3439: fmtDate()
3440: todayISO()
3442: **CONFIGURAÇÕES (Gemini e Google Drive)**
3444: loadConfigStatus()
3449: paintConfig()
3454: openSettings()
3464: closeSettings()
3465: saveConfig()
3475: **ASAAS (Financeiro) — chaves ficam em app_secrets; master_asaas_info mostra o que já existe**
3476: loadAsaasInfo()
3489: saveAsaas()
3497: testarAsaas()
3504: copiarAsaas()
3508: testDrive()
3515: resyncDrive()
3523: **FICHA DO MOTORISTA**
3526: openDriverFile()
3555: closeDriverFile()
3557: saveDriverFile()
3605: aiFillDriver()
3644: **CONTROLE FINANCEIRO**
3645: finRange()
3662: dayBR()
3663: inRange()
3665: onFinPeriodChange()
3671: fillFinFilters()
3678: clearFinFilters()
3682: updateFinFilterCount()
3691: openFinance()
3696: switchFinTab()
3706: closeFinance()
3708: renderFinance()
3771: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
3773: okEmail()
3775: openEmailCompose()
3796: closeEmailCompose()
3797: sendEmailCompose()
3812: emailRecibo()
3817: emailIA()
3825: **RELATÓRIO DO FINANCEIRO**
3827: finFiltersText()
3832: finPeriodText()
3839: buildReportHtml()
3861: openFinReport()
3871: closeFinReport()
3872: printFinReport()
3876: shareFinReport()
3886: emailFinReport()
3892: **DESPESAS DO VEÍCULO**
3894: openExpenses()
3906: closeExpenses()
3907: fillExpenseTypes()
3912: createExpenseType()
3927: aiReadExpense()
3959: renderExpenses()
3981: saveExpense()
4008: deleteExpense()
4029: photoCard()
4058: inspectionHtml()
4084: hydrateImages()
4090: openInspection()
4098: closeInspection()
4102: renderInspectionModal()
4109: uploadInspection()
4140: deleteInspectionPhoto()
4156: fmtDue()
4162: nextDueLocal()
4173: openNewPix()
4202: **CAUÇÃO DO MOTORISTA**
4203: cauOf()
4204: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
4205: devOf()
4206: devCobrancas()
4208: devPrevisao()
4216: dfDevRender()
4243: dfDevIr()
4244: dfDevSalvar()
4249: dfDevAvisar()
4255: dfDevDesfazer()
4259: dfDevReceber()
4268: cauNext()
4275: dfCauFill()
4285: dfCauCalc()
4302: dfCauRead()
4315: **CAUÇÃO: quanto já foi pago**
4317: cauStatus()
4327: obsResumoHtml()
4328: cauResumoHtml()
4333: **MULTAS E OUTRAS DESPESAS**
4334: multasOf()
4336: multaPagaAuto()
4341: multasAbertas()
4342: multasPendentes()
4343: multasResumoHtml()
4351: cobOf()
4352: dfCobFill()
4358: dfCobRead()
4361: dfCobInfo()
4371: cobResumoHtml()
4375: ajustesOf()
4377: previsaoProxima()
4390: previsaoHtml()
4394: dfAjRender()
4400: addAjuste()
4406: delAjuste()
4409: abrirAjustes()
4410: renderProxCobrancas()
4416: savePixExtra()
4424: dfMultFill()
4432: fdPaga()
4433: dfMultRender()
4442: toggleMultas()
4449: addMulta()
4457: delMulta()
4462: multaPaga()
4468: renderDriverExtras()
4495: mondayAfter()
4503: renderDriverProfileExtras()
4551: semanaDoPix()
4557: **MEUS RECIBOS (área do motorista)**
4559: meusRecibosLista()
4563: openMeusRecibos()
4577: closeMeusRecibos()
4578: reciboPdfHtml()
4589: verMeuRecibo()
4596: voltarMeusRecibos()
4597: pdfMeuRecibo()
4601: shareMeuRecibo()
4608: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
4609: editVehicleRent()
4621: nextParcel()
4627: fillNewPixValues()
4663: newPixParts()
4694: **PERÍODO E VENCIMENTO DA COBRANÇA**
4695: dataISO()
4696: dataDe()
4697: dataMais()
4698: dataBR()
4699: diasEntre()
4700: isoSP()
4701: pixPeriodo()
4708: pixDesc()
4709: pixDiasPeriodo()
4713: pixDatasNovo()
4722: pixDatasMudou()
4733: pixAluguelProporcional()
4741: pixPeriodoInfo()
4754: pixAddLinha()
4761: pixLinhas()
4763: descSoma()
4773: calcNewPix()
4782: **RECIBO DE PAGAMENTO**
4786: receiptValue()
4787: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
4788: atrasoDados()
4795: cobrarAtraso()
4811: allocatePix()
4830: reciboData()
4853: fmtDateTimeBR()
4854: reciboTexto()
4905: openRecibo()
4922: closeRecibo()
4923: **CORRIGIR RECIBO**
4925: corrigirLinhaHtml()
4935: openCorrigirRecibo()
4958: closeCorrigirRecibo()
4959: corrigirLer()
4965: corrigirSoma()
4972: salvarCorrigirRecibo()
4989: copyRecibo()
4994: reciboCanvas()
5011: reciboPdfBlob()
5029: shareReciboPdf()
5043: rotularTabelas()
5063: areaAberta()
5064: markAreas()
5067: closeAreas()
5071: toggleArea()
5081: dobraSalva()
5082: setDobra()
5087: toggleDobra()
5094: dobraTopo()
5101: renderMasterResumo()
5115: loadIA()
5136: updateIABadge()
5141: loadIASetting()
5147: paintIASwitch()
5153: toggleIA()
5160: loadRobo()
5166: paintRobo()
5194: pedirCodigoRobo()
5203: toggleRobo()
5215: iaTodosGerar()
5233: iaTodosCancelar()
5237: iaTodosConfirmar()
5251: loadIARules()
5256: iaAbrirPdf()
5262: renderIARules()
5266: saveIARules()
5271: addIARule()
5276: delIARule()
5280: openIA()
5293: closeIA()
5294: iaShow()
5295: iaPhone()
5300: renderIA()
5342: iaAprovar()
5351: iaPhone2()
5352: iaSend()
5363: iaMark()
5372: iaDelete()
5381: openPixArea()
5390: closePixArea()
5391: renderPixArea()
5427: openEditPix()
5456: deletePix()
5468: closeNewPix()
5470: saveNewPix()
5561: pushSupported()
5562: isIOS()
5563: isStandalone()
5564: b64ToBytes()
5570: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
5575: notifStatus()
5583: stepsList()
5587: notifHelpHtml()
5621: renderNotifModal()
5633: checkDriverNotifications()
5664: activateFromModal()
5675: refreshNotifButton()
5694: subscribePush()
5709: enableNotifications()
5727: closeDocViewer()
5735: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
5747: allFeaturesOn()
5748: feat()
5749: loadDriverFeatures()
5756: saveDriverFeatures()
5760: drawFeatureToggles()
5775: setAllFeatures()
5780: applyDriverFeatures()
5794: **PIX: conferência do código e QR code desenhado no aparelho**
5795: crc16()
5803: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
5805: pixTxt()
5806: pixCampo()
5807: pixGerarCodigo()
5817: pixAutoLigado()
5818: pixAutoMudou()
5823: gerarPixAuto()
5839: pixRecebedorCarregar()
5850: pixRecebedorGuardar()
5857: pixValid()
5863: renderPixQr()
5873: previewNewPixQr()
5883: **FOTO DO MOTORISTA (recortada da CNH)**
5884: photoPath()
5885: fileToCanvas()
5904: cropPhoto()
5918: savePhoto()
5923: photoBoxFrom()
5929: fillAvatar()
5940: fillAvatars()
5953: storedFile()
5960: photoFromCnh()
5972: **FOTO DO PERFIL ACOMPANHA A CNH**
5975: cnhStamp()
5976: photoFiles()
5984: avatarPath()
5989: syncCnhPhotos()
6012: pickImage()
6015: changeDriverPhoto()
6031: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
6033: uploadTmp()
6040: clearTmp()
6045: aiReadFiles()
6051: okDateISO()
6053: noAccents()
6055: makeUsername()
6064: titleCase()
6065: syncNewDriverAccess()
6071: setNewDriverPhoto()
6076: pickNewDriverPhoto()
6080: resetNewDriverForm()
6088: newDriverDocChosen()
6122: anoCrlv()
6123: aiReadCrlv()
6140: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
6141: sendWelcomeEmail()
6147: showCredentials()
6158: demoAssistente()
6177: **PERGUNTAR À IA (ÁREA IA, só o master)**
6181: iaChatReset()
6182: iaNorm()
6183: iaAcha()
6189: iaVeicTxt()
6190: iaCamposVeic()
6191: iaDataOk()
6192: iaOpcoes()
6193: iaTodosMotoristas()
6197: iaFerramenta()
6286: renderIAChat()
6303: iaChatDica()
6304: iaChatEnviar()
6339: iaChatNota()
6340: iaCancelarCartao()
6341: iaConfirmarCartao()
6384: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
6385: renderAppEarnings()
6449: saveAppEarning()
6474: workDayISO()
6475: renderDayOff()
6486: setDayOff()
6496: aiReadEarning()
6529: **DESPESAS DO APLICATIVO**
6531: appExpCustomTypes()
6532: fillAppExpTypes()
6539: onAppExpTypeChange()
6544: saveAppExpense()
6568: deleteAppExpense()
6575: deleteAppEarning()
6670: loadTermsAcceptances()
6682: termsOf()
6683: currentAcceptance()
6684: needsTermsAcceptance()
6687: fmtDateTime()
6690: termsPlainText()
6694: termsHash()
6702: openTermsGate()
6725: termsGateCheck()
6733: acceptTerms()
6753: acceptanceHtml()
6764: openTermsViewer()
6782: closeTerms()
6788: downloadTermsCopy()
6809: termsBadgeMaster()
6816: termsMasterDetail()
6857: renderTermsSetupBanner()
6870: copyTermsSql()
6880: cnhExpired()
6881: cnhWaiting()
6882: onlyDigits()
6883: normName()
6885: verifyCnh()
6897: renderCnhBanner()
6915: sendNewCnh()
6963: cnhBadgeMaster()
6971: applyPendingCnh()
6979: autoReadNewCnhs()
6997: cnhPendingHtml()
7011: recheckPendingCnh()
7021: rejectPendingCnh()
7031: showContractDoc()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (775 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
94: criarRobo()
97: hora()
98: log()
108: pareado()
109: limparLocal()
111: motoraBruto()
122: motora()
128: avisarErroPareamento()
130: *conexão guardada no Supabase*
131: existeGuardada()
132: restaurar()
166: guardar()
194: agendarBackup()
200: *conexão com o WhatsApp*
201: agendarAbrir()
206: backoff()
211: falhaAoAbrir()
213: soltarSocket()
220: abrir()
251: *conversa que já existia (pedido do dono, 04/11/2026)*
255: aoHistorico()
263: conversaAntiga()
275: aoMudar()
304: esquecerConexao()
310: aoCair()
326: reabrirQr()
351: *conectar pelo número*
352: verificarPareamento()
393: *fila de envio*
395: mandar()
406: conteudoDe()
412: enviar()
429: enviarCopias()
451: marcarEnviada()
458: verReinicio()
469: sinalDeVida()
482: ciclo()
517: *mensagens recebidas (comprovante de motorista e resposta do dono)*
520: aoReceber()
527: telefoneDe()
536: avisarArquivoSemNumero()
543: comRepeticao()
551: responder()
556: tratarRecebida()
613: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
615: destino()
623: encaminhar()
628: ouvirDono()
640: entregarAtendimento()
665: pessoaRespondeu()
678: chamarDara()
701: cicloAtendimento()
706: receberArquivo()
725: *página do QR*
726: pagina()
740: *laços*
741: repetir()
748: iniciar()
759: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (302 linhas)

22: serviceKey()
29: json()
31: brl()
34: secret()
39: asaas()
52: avisar()
62: hojeBR()
63: proximoDia()
70: proximaParcela()
79: cobrarMotorista()
92: *valores (mesma regra do Novo Pix)*
118: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
140: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
160: cobrarTodos()
179: *pagamento recebido*
180: quemPagou()
203: pagamentoRecebido()
243: ehMaster()
253: preparar()
254: limpa()
291: acao "preparar"
295: acao "cobrar"

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (288 linhas)

15: serviceKey()
21: json()
22: brl()
26: secret()
31: hojeBR()
32: diaBR()
33: proximoDia()
40: previsao()
54: formaAuto()
56: avisoDono()
81: avisoMotorista()
102: emAberto()
114: avisoAtraso()
132: **4) PIX AUTOMÁTICO DO MOTORA**
134: crc16()
139: campo()
140: txtPix()
141: codigoPix()
148: chaveNormal()
155: proximaParcela()
163: pixAutomatico()
170: *valores (mesma regra do Novo Pix e do Asaas)*
195: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
216: pixAutoTodos()
240: enviar()
249: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (437 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
295: sendToDriver()
308: type "public_key"
317: type "sunday"
325: type "recibo_teste"
329: type "master_alert"
333: type "driver_alert"
345: type "test"
353: type "aprovar_msg"
364: type "todos_rascunho"
372: type "todos_enviar"
382: type "new_pix"
394: type "boas_vindas"
409: type "cobranca"

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
